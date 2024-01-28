const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({origin: true});

//intsialization of admin
admin.initializeApp();
const db = admin.firestore();


exports.validateUserJWTToken = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const token = req.get("Authorization");
        
        //check if Authorization header is present
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const jwtToken = token.split('Bearer ')[1];
        
        try {
            const decodedToken = await admin.auth().verifyIdToken(jwtToken);
            // Here you can perform additional validation or checks on the decoded token
            if(decodedToken){
                const docRef = db.collection('users').doc(decodedToken.uid);
                const doc = await docRef.get();

                if(!doc.exists){
                    const userRef = await db.collection("users").doc(decodedToken.uid);
                    await userRef.set(decodedToken);
                }

                return res.status(200).json({ success: true, user : decodedToken });
            }
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' , status: "un-Authorized" });
        }
    })    
})