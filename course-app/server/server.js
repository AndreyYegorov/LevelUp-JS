const express = require('express'),
    path = require('path'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '../public/assets/uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    }),
    upload = multer({ storage }),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    router = express.Router(),
    history = require('connect-history-api-fallback'),
    Schema = mongoose.Schema;

const ChatMessageSchema = new Schema({
  userName: {
    type: String
  },
  messageText: {
    type: String
  },
  hashes: {
    type: Array
  },
  date: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  imageUrl: {
    type: String
  }
});

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

const Users = mongoose.model('Users', UserSchema),
  ChatMessages = mongoose.model('ChatMessages', ChatMessageSchema);

mongoose.connect('mongodb://localhost:27017/demo', (err) => {
  if(err) throw new Error(err);
});

const app = express();

app.use(history());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('../public'));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUnitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  Users.findOne({ username }, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    Users.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.use('/api', router);

router.get('/messages', (req, res) => {
    ChatMessages.find({}, (err, messages) => {
        res.send(messages);
    });
});

router.post('/upload', upload.array('image'), (req, res) => {
    console.log('files', req.files);
});

router.post('/message', (req, res) => {
    let { userName, messageText, hashes, date, avatarUrl, imageUrl } = req.body;

    ChatMessages.create({ userName, messageText, hashes, date, avatarUrl, imageUrl }, (err, message) => {
      console.log(message);

      if(err) {
        console.log('error');
        return;
      }

      res.send(message);
    });
});

router.post('/signup', (req, res) => {
  let { username, name = null, password } = req.body;

  Users.create({ username, name, password }, (err, user) => {
    console.log('Registered user is: ' + user);

    if(err) {
      console.log('signup error');
      res.status(401).send(err);
    }

    req.login(user, (err => {
      if(err) {
        console.log('login error durign registering');
      }
    }));

    res.send(user);
  });
}); 

router.get('/user', (req, res) => {
  let user = req.user;

  console.log('User that logged is: ' + user);

  if(!user) {
    res.status(401).send({ err: 'Get logged user error' });
  }

  res.send(user);
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  let user = req.user;

  if(!user) {
    res.status(401).send({ err: 'Login error' });
  }

  res.send(user);
});

router.get('/logout', (req, res) => {
  let user = req.user;

  if(user) {
    req.logout();
  }

  res.send(user);
});

app.listen(3000, () => {
    console.log('Listen on 3000');
});