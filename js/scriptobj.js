    var citys = {london : {temp : 12, wind : 6}, "tokio" : {temp : 17, wind : 2}, kiyv : {temp : -6, wind : 5}};
        //var name = prompt("What delete?");
    /*for(var i in citys) {
        if (i == 'tokio'){
            delete citys[i];
        }
    }
*/
    var deleteCity = prompt("Delete");
    delete citys[deleteCity.toLowerCase()];

    var propertyName = "ny";
    var temp_val = "22";
    var wind_val = "7";
    citys[propertyName] = {temp : temp_val, wind : wind_val};



    for (var i in citys) {
      alert( "Ключ: " + i + " ветер: " + citys[i].wind );
    }
/*
for(var i in citys) {
    if (citys.hasOwnProperty(i)) {
        console.log(citys[i].wind, citys[i].temp);
    }
}
*/
    //add object to localstorage
    /*var storedNames = JSON.stringify(obj);
    localStorage.setItem("object", storedNames);
    delete obj.citys[1];
    var name = obj.citys[0].toLowerCase();
    alert(name);
var newObj = [];
for(var i in obj.citys) {
    if (obj.hasOwnProperty(i)) {
        alert(i, '' + obj.citys[i]);
    }
}

*/
         
      /*
        var storedNames = JSON.stringify(obj);
    localStorage.setItem("object", storedNames);
        
    //call object into localstorege
        var storage = JSON.parse(localStorage.getItem("object"))
        //alert

        var i;
        for (i=0; i<storage.citys.length; i++)
        {
            if (storage.citys[i] != null){
                alert(storage.citys[i]);
            }
        }
        //add new city
        obj["citys"].push("Next city");


        //add object to storage
        var storedNames = JSON.stringify(obj);
        localStorage.setItem("object", storedNames);
    */