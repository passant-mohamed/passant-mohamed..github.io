
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

   /*Update with yours config*/
 const firebaseConfig = {
   apiKey: "AIzaSyBdMzytQBvrtuNRkaNjjvJAeezf61aw0aE",
   authDomain: "moc-app-c88cd.firebaseapp.com",
   projectId: "moc-app-c88cd",
   storageBucket: "moc-app-c88cd.appspot.com",
   messagingSenderId: "1003010779635",
   appId: "1:1003010779635:web:9d84bf808e3493b4508a86",
   measurementId: "G-D5ZGQC80Y6"
 };
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  /*messaging.onMessage((payload) => {
  console.log('Message received. ', payload);*/
  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });