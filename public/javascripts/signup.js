/*
/**
 * Form Validation
 */
 const formValidation = () => {
    let form = document.forms["loginform"];
    

    /**
     * toggle password`s privacy
     *      
     * @params {object} e the event object
     * @return none
     * 
     */
    let validateForm = (e) => {
        let username = e.target["username"];
        let password = e.target["password"];

        if(username.value == ""){
            username.style.border = "2px solid red";
            username.style.borderRadius = "5px";
            e.preventDefault();
        }
        else{
            username.style.border = "1px solid #777777b2";
        }
        if(password.value == ""){
            password.style.border = "2px solid red";
            password.style.borderRadius = "5px";
            e.preventDefault();
        }
        else{
            password.style.border = "1px solid #777777b2";
        }

    }

/*
    form.addEventListener("submit",validateForm);
*/
}

formValidation();

/**
 * Handles Selection Process
 */
const handleSelection = () => {
    
    const ratioes = document.querySelectorAll("input[type=radio]");
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    const tab = document.querySelector("#tab");
    let tabs = [];
    let secondaryCourses = [];
    let mainCourse = null;
    let prev = null;

    /**
     * Handles Change Event for Radioes
     * @param {object} event 
     */
    const mainCourseSelection = (event)=>{
        prev = prev ? prev : event.target;
        let target = event.target;
        let parent = target.parentNode;
        if (target !== prev) {

            prev.parentNode.style.border = "2px solid #BBBBBB";
            prev = target;

            parent.style.border = "2px solid #FF5500";

            mainCourse = target.value;

        }else{
            prev.parentNode.style.border = "2px solid #FF5500";
            mainCourse = prev.value;
        }
        toggleSecondaryCourses(mainCourse);
        activeNextButton();
    }
    
    ratioes.forEach((ratio , index) => {
        ratio.addEventListener("change",mainCourseSelection)
    })
    
    /**
     * Handles Change Event for checkboxes
     * @param {object} event 
     */
    const secondaryCoursesSelection = (event)=>{
        let target = event.target;
        let parent = target.parentNode;
        if(target.checked == true){
            parent.style.border = "2px solid #FF5500";
            secondaryCourses.push(target.value);
        }else{
            parent.style.border = "2px solid #BBBBBB";
            secondaryCourses.pop(target.value);
        }
        activeNextButton();
    }


    /**
     * Disable and Enable Secondary Courses
     */
    const toggleSecondaryCourses = (course) => {
        if(course == "VIP" || course == "Offers" || course == "Physiotherapy"){
            checkboxes.forEach((checkbox , index) => {
                
                let parent = checkbox.parentNode;
                checkbox.checked = false;
                parent.style.border = "2px solid #BBBBBB";
                secondaryCourses.pop(checkbox.value);

                checkbox.disabled = true;
                let img = checkbox.parentNode.querySelector('img')
                img.style.filter = "grayscale(100%)";

            })

        }else{
            checkboxes.forEach((checkbox , index) => {
                checkbox.disabled = false;
                let img = checkbox.parentNode.querySelector('img')
                img.style.filter = "grayscale(0%)";
                
            })
        }
    }

    checkboxes.forEach((checkbox , index) => {
        checkbox.addEventListener("change",secondaryCoursesSelection)
    })

    const prevBtn = document.querySelector('#previous');
    const nextBtn = document.querySelector('#next');

    prevBtn.disabled = true;
    nextBtn.disabled = true;

    /**
     * Active Next Button When the user finish selection
     */
    const activeNextButton = () => {
        if(mainCourse != null){
            nextBtn.disabled = false;
        }else{
            nextBtn.disabled = true;
        }   
    }

    const sendData = (event)=> {
        let data = {
            mainCourse: mainCourse,
            secondaryCourses: secondaryCourses,
        }
        let req = new XMLHttpRequest();
        req.open("POST", '/signup?tab=1', true);
        req.setRequestHeader("Content-Type", "application/json");
        var payload = JSON.stringify(data);
        req.send(payload);
        req.onreadystatechange = () => {
            if (req.readyState === 4 && !req.status) {
                tab.innerHTML += "<span class='failed'>FAILED!</span>" ;
            } else if (req.readyState === 4 && req.status === 404) {
                let data = JSON.parse(req.responseText);
                let err = data.content.err;
                tab.innerHTML += `<span class='failed'>${err}</span>` ;
            }else if (req.readyState === 4 && req.status === 200) {
                let data = JSON.parse(req.responseText);
                console.log(data)
            }
        }
    }

    nextBtn.addEventListener("click",sendData);
    
}

handleSelection();



