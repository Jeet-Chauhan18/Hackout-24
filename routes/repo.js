
const express = require('express');
const router = express.Router();
const Repo = require('../models/Repo');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const AWS = require('aws-sdk');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

router.use(express.json());
router.use(cookieParser());

const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint('https://s3.us-east-005.backblazeb2.com'), 
    accessKeyId: '005dc64fe90edad0000000002',  
    secretAccessKey: 'K005L7cEBxo7jvhpDoSbBepQG9Tb0U0', 
    region: 'us-west-002',
    signatureVersion: 'v4'
});

const upload = multer({ dest: 'uploads/' });

async function uploadFile(bucketName, file, repoId) {
    const fileContent = fs.readFileSync(file.path);
    const fileName = path.basename(file.path);

    const params = {
        Bucket: bucketName,
        Key: `${repoId}/${fileName}`, 
        Body: fileContent,
    };

    try {
        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully at ${data.Location}`);
        
        const signedUrl = s3.getSignedUrl('getObject', {
            Bucket: bucketName,
            Key: `${repoId}/${fileName}`,
            Expires: 60 * 60 
        });
        console.log('Signed URL:', signedUrl);

        return data.Location, signedUrl;
    } catch (err) {
        console.error(`File upload failed: ${err.message}`);
        throw err;
    }
}


async function saveFileMetadata(repoId, fileName, filePath, fileSize) {
    const repo = await Repo.findById(repoId);
    repo.files.push({
        name: fileName,
        path: filePath,  
        size: fileSize,
    });
    await repo.save();
}

function isAuthenticated(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
            if (err) {
                res.redirect('/auth/login');
            } else {
                req.userId = decoded.userId;
                next();
            }
        });
    } else {
        res.redirect('/auth/login');
    }
}

router.get('/dashboard', isAuthenticated, async (req, res) => {
    const repos = await Repo.find({ user: req.userId });
    res.render('dashboard', { repos });
});

router.post('/create', isAuthenticated, async (req, res) => {
    const { name, description } = req.body;
    const repo = new Repo({ name, description, user: req.userId });
    await repo.save();
    res.redirect('/repo/dashboard');
});

router.post('/:id/like', isAuthenticated, async (req, res) => {
    const repo = await Repo.findById(req.params.id);
    repo.likes += 1;
    await repo.save();
    res.redirect('/repo/dashboard');
});


router.post('/:id/upload', isAuthenticated, upload.single('file'), async (req, res) => {
    const repoId = req.params.id;
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const signedUrl = await uploadFile('spacehub', file, repoId);  
        await saveFileMetadata(repoId, file.originalname, signedUrl, file.size);  
        res.redirect(`/repo/${repoId}`); 
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).send('File upload failed');
    }
});


router.get('/:id', isAuthenticated, async (req, res) => {
    const repo = await Repo.findById(req.params.id);
    if (!repo) {
        return res.status(404).send('Repository not found');
    }
    res.render('repoDetails', { repo });
});

module.exports = router;
