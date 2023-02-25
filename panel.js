$(document).ready(function () {

    var table = document.getElementsByTagName("tbody")[0];
    let search=document.getElementById("search-box")
    
  
 

    function createRow(id, fname, lname, email, phone) {
        var row = document.createElement("tr");
        row.classList.add("data-row")
        var col1 = document.createElement("td");
        col1.classList.add("column1")
        col1.innerHTML = id
        row.appendChild(col1)
        var col2 = document.createElement("td");
        col2.classList.add("column2")
        col2.innerHTML = fname
        row.appendChild(col2)
        var col3 = document.createElement("td");
        col3.classList.add("column3")
        col3.innerHTML = lname
        row.appendChild(col3)
        var col4 = document.createElement("td");
        col4.classList.add("column4")
        col4.innerHTML = email
        row.appendChild(col4)
        var col5 = document.createElement("td");
        col5.classList.add("column5")
        col5.innerHTML = phone
        row.appendChild(col5)
        table.append(row)


    }


    $.get('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D', function (data) {
        for (let i = 0; i < 5; i++) {

            createRow(
                data[i].id,
                data[i].firstName,
                data[i].lastName,
                data[i].email,
                data[i].phone
            )
        }
        // adding the color to the when rows clicked
        var rows = $(".data-row")
        var details = document.querySelectorAll("#info-content > div")
        var prev;
        for (var i = 0; i < rows.length; i++) {
            rows[i].addEventListener("click", function (e) {
                console.log("clicked")
                if (prev != undefined) {
                    prev.classList.remove("active")
                }
                this.classList.add("active");
                prev = this;
                // for displaying right
                let userDetails = ""
                for (let j = 0; j < data.length; j++) {

                    if (this.childNodes[0].innerHTML == data[j].id) {
                        console.log(data[j])
                        userDetails += '<div><b>User selected:</b>' + data[j].firstName + data[j].lastName + '</div><div><b>Description:</b><textarea cols="50" rows="5" readonly>'+data[j].description+'</textarea></div><div><b>Address:</b>'+data[j].address.streetAddress+'</div><div><b>City:</b>'+data[j].address.city+'</div><div><b>State:</b>'+data[j].address.state+'</div><div><b>Zip:</b>'+data[j].address.zip+'</div>'



                    }
                }
                $("#info-content").css("display","block");

                $("#info-content").html(userDetails)
                
                

            })

        }
        // search functionality;
        $("#search-box").keyup(function(){
           for(var i=0;i<rows.length;i++){
            var fname=rows[i].childNodes[1].innerHTML.toUpperCase();
            if(fname.indexOf(search.value.toUpperCase())<0){
                rows[i].style.display="none"
            }else{
            
            rows[i].style.display="block"
            }
           }
        })


    })


    $("#table-headers").append(`<table>
    <thead><tr>
    <th class="column1">Id</th>
    <th class="column2">firstName</th>
    <th class="column3">lastName</th>
    <th class="column4">Email</th>
    <th class="column5">Phone</th>

    </tr></thead></table>`)





})