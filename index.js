const express = require('express');
const Expo = require('expo-server-sdk').default;
const cors = require('cors');

const expo = new Expo();
const expresServer = express();

expresServer.use(cors());

expresServer.listen(process.env.PORT || 3000, () => {
  console.log('Le serveur écoute sur le port:', process.env.PORT || 3000);
  expresServer.get('/', function(req, res) {
    const token = req.query.token;
    if (!Expo.isExpoPushToken(token)) {
      res.send({ err: 'Token invalide' });
      console.log('Token invalide');
    } else {
      let messages = [
        {
          to: token,
          sound: 'default',
          body: 'Notification test',
          data: { test: 'aazraezfzdfzdfdqfs' }
        }
      ];
      Expo.sendPushNotificationAsync(messages)
        .then(tiket => {
          res.send({ ticket: ticket });
        })
        .catch(err => {
          console.log("Erreur d'envoi");
          res.send({ err: 'Erreur d/envoi' });
        });
    }
  });
});
