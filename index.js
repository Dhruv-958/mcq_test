const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const auth = require('../MCQ2/auth/auth')

const app = express();
const port = 3000;

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/mcq_test', { serverSelectionTimeoutMS : 30000 });

const questionSchema = new mongoose.Schema({
    text: String,
    options: [String],
    correctOptionIndex: Number,
});

const userSchema = new mongoose.Schema({
    email : String
})

const resultSchema = new mongoose.Schema({
    email: String,
    score: Number
});

const question = mongoose.model('question', questionSchema);
const result = mongoose.model('result', resultSchema);
const user = mongoose.model('user', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret:'123-456-789',
    resave:false,
    saveUninitialized:true
}));


// Pug setup
app.set('views', './views');
app.set('view engine', 'pug');


// Routes
app.get('/',(req,res)=>{
    try {
        res.render('home.pug')
    } catch (error) {
        console.error(error)
    }
})

app.post('/',async(req,res)=>{
    try{
        const userEmail = req.body.email
        const check = await user.findOne({ email : userEmail})
        if(check){
            res.redirect('/')
        }
        else{

            const newUser = new user(req.body)
            newUser.save()
            .then(()=>{
                console.log("Success")
            })
            .catch(()=>{
                res.status(500).send("Couldn't save Data");
            })
            
            req.session.user_id = userEmail;
            const questions = await question.find();
            res.render('index.pug', { questions });
        }
        
    }catch(error){
        console.error(error);
    }
})

app.get('/test', auth.isLogin ,async(req, res) => {
    try {
        res.render('index.pug')
    } catch (error) {
        console.error(error)
    }
});

app.post('/test', auth.isLogin ,async (req, res) => {
    try{
        let marks = 0;
        const questions = await question.find()
        questions.forEach(question => {
            const userAns = req.body[`answer${question._id}`]
            const Ans = question.correctOptionIndex
            
            if(userAns == Ans ){
                marks++;
            }
        });
        const results = new result({ email : req.session.user_id, score:marks });
        results.save().then(()=>{
            res.redirect('/result');
        }).catch((error)=>{
            console.error(error)
        });
    }catch(error){
        console.error(error)
    }
});

app.get('/result', auth.isLogin,(req,res)=>{
    try {
        
    } catch (error) {
        console.error(error)
    }
    res.render('result.pug')
})

app.post('/result', auth.isLogin, (req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        console.error(error)
    }
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
