(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            // Kella lahendus
            let s = (date.getSeconds() + 1) % 60;

            if (h > 11) {
                h = h - 12;
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();

        let fname = document.getElementById("fname");
        if (fname.value === "") {
            alert("Palun sisestage oma eesnimi!");
            fname.focus();
            return;
        }
        else if (/\d/.test(fname.value)) {
            alert("Eesnimi ei tohi sisaldada numbreid!");
            fname.focus();
            return;
        }

        let lname = document.getElementById("lname");
        if (lname.value === "") {
            alert("Palun sisestage oma perekonnanimi!");
            lname.focus();
            return;
        }
        else if (/\d/.test(lname.value)) {
            alert("Perekonnanimi ei tohi sisaldada numbreid!");
            lname.focus();
            return;
        }
        
        let linn = document.getElementById("linn");
        if (linn.value === "") {
            alert("Palun valige linn nimekirjast!");
            linn.focus();
            return;
        }

        if (!document.getElementById("r1").checked && !document.getElementById("r2").checked &&
            !document.getElementById("r3").checked) {
            alert("Palun valige makseviis!");
            document.getElementById("radio-buttons").focus();
            return;
        }

        let tarneHind = 0.0;
        if (document.getElementById("v1").checked) tarneHind += 5.0;
        if (document.getElementById("v2").checked) tarneHind += 2.5;
        if (linn.value === "trt" || linn.value === "nrv") tarneHind += 2.5;
        else if (linn.value === "prn") tarneHind += 3.0;

        e.innerHTML = tarneHind + " &euro;";
        alert("Tarne hind on " + tarneHind + " eurot.");
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "Aql7EtexgCBNmCaW5W1jrouT3hS6UKEhy9B5dkHopv14DhNWd-GGDHA4JdExyzMf";

let map, infobox;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
    );
    let otepaa = new Microsoft.Maps.Location(
        58.058773,
        26.4921703
    );
    let vahepunkt = new Microsoft.Maps.Location(
        centerPoint.latitude - ((centerPoint.latitude-otepaa.latitude)/2),
        centerPoint.longitude - ((centerPoint.longitude-otepaa.longitude)/2)
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: vahepunkt,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.canvasDark,
    });

    infobox = new Microsoft.Maps.Infobox(vahepunkt, {
        visible: false
    });
    infobox.setMap(map);
    
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            subTitle: 'Hea koht',
            text: 'UT'
    });
    pushpin.metadata = {
        title: "Tartu Ülikool"
    };
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);

    let pushpin2 = new Microsoft.Maps.Pushpin(otepaa, {
        title: 'Otepää',
        subTitle: 'Talvepealinn',
    });
    pushpin2.metadata = {
        title: "Otepää"
    };
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    map.entities.push(pushpin);
    map.entities.push(pushpin2);
}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

