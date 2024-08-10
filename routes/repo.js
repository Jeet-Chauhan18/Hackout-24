// const express = require('express');
// const router = express.Router();
// const Repo = require('../models/Repo');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// router.use(express.json())
// router.use(cookieParser())

// // backblaze b2
// const AWS = require('aws-sdk');



// const s3 = new AWS.S3({
//     endpoint: new AWS.Endpoint('https://s3.us-east-005.backblazeb2.com'),  // Backblaze B2 endpoint
//     accessKeyId: "005dc64fe90edad0000000002",  // Your Backblaze B2 application key ID
//     secretAccessKey: "K005L7cEBxo7jvhpDoSbBepQG9Tb0U0",  // Your Backblaze B2 application key
//     region: 'us-west-002',  // Backblaze B2 region
//     signatureVersion: 'v4'  // Use signature version v4
// });


// const fs = require('fs');

// const path = require('path');

// async function uploadFile(bucketName, file, repoId) {
//     const fileContent = fs.readFileSync(file.path);
//     const fileName = path.basename(file.path);

//     const params = {
//         Bucket: bucketName,
//         Key: `${repoId}/${fileName}`,  // Store files under a folder named after the repo ID
//         Body: fileContent,
//     };

//     try {
//         const data = await s3.upload(params).promise();
//         console.log(`File uploaded successfully at ${data.Location}`);
//         return data.Location;
//     } catch (err) {
//         console.error(`File upload failed: ${err.message}`);
//         throw err;
//     }
// }

// async function saveFileMetadata(repoId, fileName, filePath, fileSize) {
//     const repo = await Repo.findById(repoId);
//     repo.files.push({
//         name: fileName,
//         path: filePath,  // URL to access the file
//         size: fileSize,
//     });
//     await repo.save();
// }
// router.post('/:id/upload', isAuthenticated, async (req, res) => {
//     const repoId = req.params.id;
//     const file = req.files.file;  // Assuming you're using a library like `express-fileupload` to handle file uploads

//     try {
//         const filePath = await uploadFile('spacehub', file, repoId);
//         await saveFileMetadata(repoId, file.name, filePath, file.size);
//         res.redirect(`/repo/${repoId}`);
//     } catch (err) {
//         console.error('Error uploading file:', err);
//         res.status(500).send('File upload failed');
//     }
// });














// // Middleware to check if user is authenticated
// function isAuthenticated(req, res, next) {
//     const token = req.cookies.token;
//     if (token) {
//         jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
//             if (err) {
//                 res.redirect('/auth/login');
//             } else {
//                 req.userId = decoded.userId;
//                 next();
//             }
//         });
//     } else {
//         res.redirect('/auth/login');
//     }
// }

// // Dashboard route
// router.get('/dashboard', isAuthenticated, async (req, res) => {
//     const repos = await Repo.find({ user: req.userId });
//     res.render('dashboard', { repos });
// });

// // Create repo route
// router.post('/create', isAuthenticated, async (req, res) => {
//     const { name, description } = req.body;
//     const repo = new Repo({ name, description, user: req.userId });
//     await repo.save();
//     res.redirect('/repo/dashboard');
// });

// // Like repo route
// router.post('/:id/like', isAuthenticated, async (req, res) => {
//     const repo = await Repo.findById(req.params.id);
//     repo.likes += 1;
//     await repo.save();
//     res.redirect('/repo/dashboard');
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const Repo = require('../models/Repo');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const AWS = require('aws-sdk');
// const multer = require('multer');
// const path = require('path');

// router.use(express.json());
// router.use(cookieParser());

// // Configure AWS S3 for Backblaze B2
// const s3 = new AWS.S3({
//     endpoint: new AWS.Endpoint('https://s3.us-east-005.backblazeb2.com'),  // Backblaze B2 endpoint
//     accessKeyId: '005dc64fe90edad0000000002',  // Your Backblaze B2 application key ID
//     secretAccessKey: 'K005L7cEBxo7jvhpDoSbBepQG9Tb0U0',  // Your Backblaze B2 application key
//     region: 'us-west-002',  // Backblaze B2 region
//     signatureVersion: 'v4'  // Use signature version v4
// });

// // Configure multer for file upload
// const upload = multer({ dest: 'uploads/' });

// async function uploadFile(bucketName, file, repoId) {
//     const fileContent = fs.readFileSync(file.path);
//     const fileName = path.basename(file.path);

//     const params = {
//         Bucket: bucketName,
//         Key: `${repoId}/${fileName}`,  // Store files under a folder named after the repo ID
//         Body: fileContent,
//     };

//     try {
//         const data = await s3.upload(params).promise();
//         console.log(`File uploaded successfully at ${data.Location}`);
//         return data.Location;
//     } catch (err) {
//         console.error(`File upload failed: ${err.message}`);
//         throw err;
//     }
// }

// async function saveFileMetadata(repoId, fileName, filePath, fileSize) {
//     const repo = await Repo.findById(repoId);
//     repo.files.push({
//         name: fileName,
//         path: filePath,  // URL to access the file
//         size: fileSize,
//     });
//     await repo.save();
// }

// // Middleware to check if user is authenticated
// function isAuthenticated(req, res, next) {
//     const token = req.cookies.token;
//     if (token) {
//         jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
//             if (err) {
//                 res.redirect('/auth/login');
//             } else {
//                 req.userId = decoded.userId;
//                 next();
//             }
//         });
//     } else {
//         res.redirect('/auth/login');
//     }
// }

// // Dashboard route
// router.get('/dashboard', isAuthenticated, async (req, res) => {
//     const repos = await Repo.find({ user: req.userId });
//     res.render('dashboard', { repos });
// });

// // Create repo route
// router.post('/create', isAuthenticated, async (req, res) => {
//     const { name, description } = req.body;
//     const repo = new Repo({ name, description, user: req.userId });
//     await repo.save();
//     res.redirect('/repo/dashboard');
// });

// // Like repo route
// router.post('/:id/like', isAuthenticated, async (req, res) => {
//     const repo = await Repo.findById(req.params.id);
//     repo.likes += 1;
//     await repo.save();
//     res.redirect('/repo/dashboard');
// });

// // Upload file route
// router.post('/:id/upload', isAuthenticated, upload.single('file'), async (req, res) => {
//     const repoId = req.params.id;
//     const file = req.file;

//     if (!file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     try {
//         const filePath = await uploadFile('spacehub', file, repoId);
//         await saveFileMetadata(repoId, file.originalname, filePath, file.size);
//         res.redirect(`/repo/${repoId}`);
//     } catch (err) {
//         console.error('Error uploading file:', err);
//         res.status(500).send('File upload failed');
//     }
// });

// // View repo details including files
// router.get('/:id', isAuthenticated, async (req, res) => {
//     const repo = await Repo.findById(req.params.id);
//     if (!repo) {
//         return res.status(404).send('Repository not found');
//     }
//     res.render('repoDetails', { repo });
// });

// module.exports = router;





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

// Configure AWS S3 for Backblaze B2
const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint('https://s3.us-east-005.backblazeb2.com'),  // Backblaze B2 endpoint
    accessKeyId: '005dc64fe90edad0000000002',  // Your Backblaze B2 application key ID
    secretAccessKey: 'K005L7cEBxo7jvhpDoSbBepQG9Tb0U0',  // Your Backblaze B2 application key
    region: 'us-west-002',  // Backblaze B2 region
    signatureVersion: 'v4'  // Use signature version v4
});

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// async function uploadFile(bucketName, file, repoId) {
//     const fileContent = fs.readFileSync(file.path);
//     const fileName = path.basename(file.path);

    
    
    
    
//     const params = {
//         Bucket: bucketName,
//         Key: `${repoId}/${fileName}`,  // Store files under a folder named after the repo ID
//         Body: fileContent,
//         Expires: 60 * 60, // URL expire?s in 1 hour
//     };
//     const url = s3.getSignedUrl('getObject', params);
//   console.log('Signed URL:', url);
//     try {
//         const data = await s3.upload(params).promise();
//         console.log(`File uploaded successfully at ${data.Location}`);
//         return data.Location;
//     } catch (err) {
//         console.error(`File upload failed: ${err.message}`);
//         throw err;
//     }
// }
async function uploadFile(bucketName, file, repoId) {
    const fileContent = fs.readFileSync(file.path);
    const fileName = path.basename(file.path);

    const params = {
        Bucket: bucketName,
        Key: `${repoId}/${fileName}`,  // Store files under a folder named after the repo ID
        Body: fileContent,
    };

    try {
        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully at ${data.Location}`);
        
        // Generate a signed URL if you need to share the file publicly
        const signedUrl = s3.getSignedUrl('getObject', {
            Bucket: bucketName,
            Key: `${repoId}/${fileName}`,
            Expires: 60 * 60 // URL expires in 1 hour
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
        path: filePath,  // URL to access the file
        size: fileSize,
    });
    await repo.save();
}

// Middleware to check if user is authenticated
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

// Dashboard route
router.get('/dashboard', isAuthenticated, async (req, res) => {
    const repos = await Repo.find({ user: req.userId });
    res.render('dashboard', { repos });
});

// Create repo route
router.post('/create', isAuthenticated, async (req, res) => {
    const { name, description } = req.body;
    const repo = new Repo({ name, description, user: req.userId });
    await repo.save();
    res.redirect('/repo/dashboard');
});

// Like repo route
router.post('/:id/like', isAuthenticated, async (req, res) => {
    const repo = await Repo.findById(req.params.id);
    repo.likes += 1;
    await repo.save();
    res.redirect('/repo/dashboard');
});

// Upload file route
// router.post('/:id/upload', isAuthenticated, upload.single('file'), async (req, res) => {
//     const repoId = req.params.id;
//     const file = req.file;

//     if (!file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     try {
//         const filePath = await uploadFile('spacehub', file, repoId);
//         await saveFileMetadata(repoId, file.originalname, filePath, file.size);
//         res.redirect(`/repo/${signedUrl}`);
//     } catch (err) {
//         console.error('Error uploading file:', err);
//         res.status(500).send('File upload failed');
//     }
// });

// Upload file route
// router.post('/:id/upload', isAuthenticated, upload.single('file'), async (req, res) => {
//     const repoId = req.params.id;
//     const file = req.file;

//     if (!file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     try {
//         const signedUrl = await uploadFile('spacehub', file, repoId);  // Get the signed URL
//         await saveFileMetadata(repoId, file.originalname, signedUrl, file.size);  // Save signed URL in metadata
//         res.redirect(`/repo/${repoId}fileUrl?=({signedUrl})`);  // Pass signed URL to singu
//     } catch (err) {
//         console.error('Error uploading file:', err);
//         res.status(500).send('File upload failed');
//     }
// });

router.post('/:id/upload', isAuthenticated, upload.single('file'), async (req, res) => {
    const repoId = req.params.id;
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const signedUrl = await uploadFile('spacehub', file, repoId);  // Get the signed URL
        await saveFileMetadata(repoId, file.originalname, signedUrl, file.size);  // Save signed URL in metadata
        res.redirect(`/repo/${repoId}`);  // Redirect to the repo details page
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).send('File upload failed');
    }
});


// View repo details including files
router.get('/:id', isAuthenticated, async (req, res) => {
    const repo = await Repo.findById(req.params.id);
    if (!repo) {
        return res.status(404).send('Repository not found');
    }
    res.render('repoDetails', { repo });
});

module.exports = router;
