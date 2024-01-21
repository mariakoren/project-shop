window.addEventListener("load", function (event) { 
    const es = new EventSource("http://localhost:8800/events/datetime");
    
    es.addEventListener("message", function(event) {
     const ad = document.getElementById("ad");
     ad.innerHTML = event.data;
    });
    
   });
   