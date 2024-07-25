
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
    import { getDatabase,
        ref,
        set,
        get,
        onValue,
        child,
        push,
        remove,
        update, } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyD7xkalLeHXwIk1UcsOE4-PreipJDW80JY",
    authDomain: "test-23cb1.firebaseapp.com",
    databaseURL: "https://test-23cb1-default-rtdb.firebaseio.com",
    projectId: "test-23cb1",
    storageBucket: "test-23cb1.appspot.com",
    messagingSenderId: "934344658112",
    appId: "1:934344658112:web:4f1615b161b56a4c8df125"
  };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    const app1 = Vue.createApp({
      data() {
        return {
          week: [],
          dayIndex: 2,
          timeIndex: 1
        };
      },
      methods: {
        fetchData() {
          const dataRef = ref(database, '/');
          onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            this.week = data;
          });
        },

        updateData() {
          const dataRef = ref(database, '/');
          set(dataRef, this.week)
            .then(() => {
              console.log("Data updated");
            })
            .catch((error) => {
              console.error("Error updating data: ", error);
            });
        },
        
        cancelEdit(){
          let w = this.week;
          let dayIndex = this.dayIndex;
          let timeIndex = this.timeIndex;
          w[dayIndex].toDoList[timeIndex].edit = false;
          this.week = w;
        }
      },
      mounted() {
        // const dataRef = ref(database, "/testR");
      this.fetchData();
      }
    });

    app1.mount('#app');
