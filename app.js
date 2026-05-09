const { useState } = React;


// Firebase Config
const firebaseConfig = {

  apiKey: "AIzaSyAQhGot_t3KgweBpCTgwyfAbdU_IDLl_Ek",

  authDomain: "work-sure-b3d24.firebaseapp.com",

  projectId: "work-sure-b3d24",

  storageBucket: "work-sure-b3d24.firebasestorage.app",

  messagingSenderId: "772939837673",

  appId: "1:772939837673:web:d9ba5b71236cfea5bfc078",

  measurementId: "G-6PFK1YZCL4"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Firestore
const db = firebase.firestore();


// Auth
const auth = firebase.auth();


function App() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const register = async (e) => {

    e.preventDefault();

    try {

      // Create User
      const userCredential = await auth.createUserWithEmailAndPassword(

        email,

        password

      );


      // Save User Data
      await db.collection("users").doc(userCredential.user.uid).set({

        name: name,

        email: email,

        createdAt: new Date()

      });


      alert("Registration Successful");


      setName("");

      setEmail("");

      setPassword("");


    } catch (error) {

      console.log(error);

      alert(error.message);
    }
  };



  return (

    <div className="container">

      <h1>Gym Registration</h1>

      <form onSubmit={register}>


        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />


        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />


        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />


        <button type="submit">

          Register

        </button>

      </form>

    </div>
  );
}


ReactDOM.createRoot(document.getElementById("root")).render(<App />);
