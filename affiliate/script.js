/*
{get} /v2/referral/affiliate/performance?from=Date&to=Date get performance of user
* @apiSuccess {number} referedByPhoneNumber.invited
* @apiSuccess {number} referedByPhoneNumber.pending
* @apiSuccess {number} referedByPhoneNumber.approved
* @apiSuccess {number} referedByPhoneNumber.activated
* @apiSuccess {number} referredByLink.invited
* @apiSuccess {number} referredByLink.pending
* @apiSuccess {number} referredByLink.approved
* @apiSuccess {number} referredByLink.activated
* @apiSuccess {number} total.invited
* @apiSuccess {number} total.pending
* @apiSuccess {number} total.approved
* @apiSuccess {number} total.activated

*/

const history = {
    referedByPhoneNumber: {invited: 3, pending: 2, approved: 1, activated: 1},
    referredByLink: {pending: 2, approved: 1, activated: 1},
    total: {invited: 3, pending: 4, approved: 2, activated: 2},
}

const performancePage = document.getElementsByClassName("performance")[0];
updatePerformance(history.referedByPhoneNumber);
let selectedTitle = document.getElementsByClassName("selected-performance-title")[0];

const titles = document.querySelectorAll(".performance-title");
for(let i = 0 ; i < titles.length ; i++){
    titles[i].addEventListener('click', () => {
        selectedTitle.parentElement.style.border = 'none';
        selectedTitle.classList.remove("selected-performance-title");
        selectedTitle = titles[i];
        selectedTitle.classList.add("selected-performance-title");
        selectedTitle.parentElement.style.borderBottom = '2px solid #2266f4';
        console.log(document.querySelector(".performance-titles").scrollLeft);
        switch(i){
            case 0:
                updatePerformance(history.referedByPhoneNumber);
                document.querySelector(".performance-titles").scrollLeft = 0;
                break;
            case 1:
                updatePerformance(history.referredByLink);
                document.querySelector(".performance-titles").scrollLeft = -120;
                break;
            case 2:
                updatePerformance(history.total);
                document.querySelector(".performance-titles").scrollLeft -= 500;
                break;  
        }
    })
}

function updatePerformance(performance){
    performancePage.querySelector(".invited").innerHTML = performance.invited;
    performancePage.querySelector(".pending").innerHTML = performance.pending;
    performancePage.querySelector(".approved").innerHTML = performance.approved;
    performancePage.querySelector(".activated").innerHTML = performance.activated;
}




