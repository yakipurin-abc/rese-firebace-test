import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyCGncn_TErJDwt9O_71bqvD6ytj238mqC4",
      authDomain: "rese-pj.firebaseapp.com",
      projectId: "rese-pj",
      storageBucket: "rese-pj.appspot.com",
      messagingSenderId: "896132342934",
      appId: "1:896132342934:web:38339125a675a17335ceb7",
      measurementId: "G-68P6WQKWHC"
    }
  )
}
export default firebase
