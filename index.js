
const UICONTROLLER = (function(){

     domStrings = {
         // Switch bewtween pages //
         template: document.querySelector(".template"),
         viewDetails : document.querySelectorAll(".viewDetails"),
          // Switch bewtween pages //

          // Making Deposit //
         headingDeposit: document.querySelector('.heading__deposit'),

         plus: document.querySelector('.plus'),

         depositChoosePage: document.querySelector('#depositChoosePage'),
         depositConfirmPage: document.querySelector('#depositConfirmPage'),
         alert: document.querySelector('.depositModal__alert'),
         selectCurrency: document.querySelector('.selectCurrency'),
         selectPlan: document.querySelector('.selectPlan'),
         inputAmount: document.querySelector('#inputAmount'),
         showAmount: document.querySelector('#showAmount'),
         continueBtn: document.querySelector('#continueBtn'),
         backBtn: document.querySelector('#backBtn')
           // Making Deposit //

        
     }
    

    return {
        domStrings: domStrings,

        showAmountUI: (result) => {

            if(!isNaN(result.amount) && result.amount < 1000000) {
                domStrings.showAmount.textContent = `$${result.amount}`;
                
            }
           

            if(result.status == false) {
            // 1 show alert message on ui;
           domStrings.alert.innerHTML =  result.alert;
           domStrings.continueBtn.style.display= 'none';
            // 2 Making Button Unclickable //
            
       
                    

            } else {
                // clearing error message
                domStrings.alert.innerHTML = "";
                domStrings.continueBtn.style.display= 'block';
            }

        },

        displayCollection: (collection, id, values) => {

            let row = "";

            if (id === 0) {
                domStrings.template.innerHTML = `<div class="account">
                <div class="account-main">
                    <p class="account-main__balance">Balance</p>
    
                    <p class="account-main__amount"> $40,000</p>
    
                    <a href="" data-val="0" class="account-main__right-arrow viewDetails goBack" style="font-size: 1.5rem"> &larr; Back</a>
                </div> </div>`;
    
            }else {
                domStrings.template.innerHTML = ` <div class="account-card account-card--${id}"> 
                <p class="account-card__type">${values[id].individual}</p>
                <p class="account-card__addition">${id===1 ? '4%' : ""}</p>
                <p class="account-card__amount">${values[id].total}</p>
                 <a href=""  data-val="${id}" class="account-card__right-arrow viewDetails goBack" style="font-size: 1.5rem">&larr; Back</a>

            </div> `
            }
            // getting items into a container
           collection.forEach(item => {
              row += `  <tr class="table__body-row">
              <td class="table__body-item table__body-item--type">${item.type}</td>
              <td class="table__body-item">${item.date}</td>
              <td class="table__body-item"><img class="currency-image" src="img/bitcoin.jpg" > </td>
              <td class="table__body-item">${item.amount}</td>
              <td class="table__body-item "><span class="table__body-item--${item.status}">${item.status}</span></td>
          </tr>` ;

           });

           domStrings.template.innerHTML += `<div class="transactions u-margin-bottom-large">
           <h1 class="heading-2  u-text-align-center u-margin-bottom-medium">Latest transactions</h1>
           <table class="table u-margin-bottom-small "> 
               <thead class="table__head">
                   <tr class="table__head-row">
                       <th class="table__head-item">Transaction Type</th>
                       <th class="table__head-item">Date</th>
                       <th class="table__head-item">Currency</th>
                       <th class="table__head-item">Amount</th>
                       <th class="table__head-item">Status</th>
                       
                   </tr>

               </thead>


               <tbody class="table__body">
                   ${row}
               </tbody>

           </table>

           <div class="u-float-right-button ">
           <a href="" class="view-all ">View All <span>&rarr;</span></a>
           </div>

           </div>

        
         
        `;


        }


    }

}())


const DBCONTROLLER = (function(){
 const values = [
     {
         individual: 'Balance',
         total: "$40,000"
     },

     {
        individual: 'Earned',
        total: "$12,000"
    },

    {
        individual: 'Deposit',
        total: "$3000"
    },

    {
        individual: 'Withdrawn',
        total: "$30000"
    }



 ];

  const data = [
      [    
          {
              type: "Deposit",
              date: "20/12/2020",
              curreny: "bitcoin",
              amount: 20000,
              status: 'failed'
            
          }, 

          {
            type: "Earned",
            date: "19/7/2019",
            curreny: "bitcoin",
            amount: 20000,
            status: 'pending'
          
        },

        {
            type: "Earned",
            date: "12/11/2020",
            curreny: "bitcoin",
            amount: 20000,
            status: 'confirmed'
          
        }

      ],

      [

      ],

      [
        {
            type: "Deposit",
            date: "3/9/2019",
            curreny: "bitcoin",
            amount: 2000,
            status: 'confirmed'
          
        }, 

        {
          type: "Deposit",
          date: "4/9/2020",
          curreny: "bitcoin",
          amount: 15000,
          status: 'confirmed'
        
      },

      {
          type: "Deposit",
          date: "5/9/2018",
          curreny: "bitcoin",
          amount: 2000,
          status: 'confirmed'
        
      }

    ],

    [
        {
            type: "Withdrawal",
            date: "3/9/2019",
            curreny: "bitcoin",
            amount: 1900,
            status: 'confirmed'
          
        }, 

        {
          type: "Withdrawal",
          date: "4/9/2020",
          curreny: "bitcoin",
          amount: 16500,
          status: 'pending'
        
      },

      {
          type: "Withdrawal",
          date: "5/9/2018",
          curreny: "bitcoin",
          amount: 20000,
          status: 'failed'
        
      }

    ]
  ];

   return {
       data: data,
       values: values
   }


}())

//////////////////Deposit Controller //////////////////////////

const DEPOSITCONTROLLER = (function(){
 ////////////////////////////////////////DATA ////////////////////////////////////////////
               // plan array //
               const plans = [
                   {
                       name: 'bronze',
                       min: 2000,
                       max: 9999
                       
                   }, 
                   {
                       name: 'silver',
                       min: 10000,
                       max: 49999
                   },

                   {
                       name: 'gold',
                       min: 50000,
                       max: 499999
                   },

                   {
                       name: 'platinum',
                       min: 500000,
                       max: 1000000
                   }
               ];

               // currency array//

               const currencies =[

                {
                    name: 'bitcoin',
                    address: "bitcoin4554ij4oi5h45h4oj5o4uh545"
                },

                {
                    name: 'ethereum',
                    address: "eheredfdfjaidpfa8ujfia pefae"
                }, 

                {
                    name: 'xrp',
                    address: "XRPdfjhaodfhapoiuhf oa fe"
                }



               ];
////////////////////////////////////////end of DATA ////////////////////////////////////////////

                 const data = {
                     currencies: currencies,
                     plans: plans
                 };



                const checkRequirements= (amount, plan, currency)=>{

                        let status = "";
                        let alert = "";
                        let address= "";
                            
                            if(isNaN(amount) ) {
                               
                                    alert = `<div class="depositModal__alert depositModal__alert--failed">Please Insert a valid Amount </div>`;
                                    status = false;
                                   
                               
                            }
                            else if(amount < plan.min || amount > plan.max){

                                
                                    alert = `<div class="depositModal__alert depositModal__alert--failed">Please Insert an Amount between $${plan.min} and $${plan.max} </div>`;
                                    status = false;
                                   
                                
                            } else {
                               
                                    status = true;
                            }


                          let selectedCurrency  =  data.currencies.findIndex(item => {
                                return item.name == currency;
                            });

                            selectedCurrency = data.currencies[selectedCurrency];

                            return {
                                status: status,
                                address: selectedCurrency.address,
                                alert: alert,
                                plan: plan,
                                currency: selectedCurrency.name,
                                amount: amount
                            }


                         }

                return {

                    validateAmount : (inputAmount, plan, currency)=> {

                        //1 Get plan from array  
                      selectedPlan = data.plans.findIndex(item => {
                            return item.name === plan
                        });
                      selectedPlan = data.plans[selectedPlan];

                      //2 Check if Amount Meets Requirements //

                       return checkRequirements(inputAmount, selectedPlan, currency);
                    

                    }
                }

}())
//////////////////end of Deposit Controller //////////////////////////



const controller = (function(UICTRL, DBCTRL, DEPOSITCTRL){
       
    let state = {
        template: null,
        id: null,
        collection: null,
        address: null,
        amount: null,
        currency:null,
        plan: null,
        depositTemplate: null
    }


    // helper functions //

    const collection = (db , id) => {
       
        let result = db[id];

        state.collection = result;

     
       }
 

    const warning = (let)=> {
         console.log(`${let} me go to school`);
    }

   



    return {

  
    init: function (event) {
    // 1 Put contents of template inside state to store //
    event.preventDefault();

    event.target.parentElement.classList.add('scale-up');
   
        state.template = UICTRL.domStrings.template.innerHTML;
        let id = parseInt(event.target.dataset.val);
        state.id = id;
    
       setTimeout(()=>{

            //2 Get individual collection //
        collection(DBCTRL.data, state.id);
     
        // 3 Give collection to UI controller to display //
        UICTRL.displayCollection(state.collection, state.id, DBCTRL.values);
       }, 1000) ;

      
       /* Going Back */

       

    },
  

    deposit: (event)=> {
        
        UICTRL.domStrings.plus.classList.toggle('spin');
        UICTRL.domStrings.depositChoosePage.classList.toggle('u-display-block');
        UICTRL.domStrings.depositConfirmPage.classList.remove('u-display-block');
       
       // state.depositTemplate = UICTRL.domStrings.depositModal.innerHTML;


       //* On inputing amount in the amounts tab

       document.addEventListener('keyup', event => {
            if(event.target.id == 'inputAmount') {


              

                    state.amount = event.target.value;
                    
                 function everything (inputAmount) {
        
                     //1 Get inputed Amount /
        
                    
        
                     // 2 Validate Amount 
                      let plan =  UICTRL.domStrings.selectPlan.options[UICTRL.domStrings.selectPlan.options.selectedIndex].value.toLowerCase();
                      let currency =  UICTRL.domStrings.selectCurrency.options[UICTRL.domStrings.selectCurrency.options.selectedIndex].value.toLowerCase();
                      
                       let result  = DEPOSITCTRL.validateAmount(inputAmount, plan, currency );
             
                     //3 saving information into state
                         state.address = result.address;
                         state.plan = result.plan;
                        state.amount = inputAmount;
                         state.currency = result.currency;
             
                       // 4 Show Amount and Validation message in UI
                         UICTRL.showAmountUI(result);
                       
        
                         /* On clicking Continue */
                         UICTRL.domStrings.continueBtn.addEventListener('click', function(event){
                             event.preventDefault();
                             UICTRL.domStrings.depositChoosePage.classList.remove('u-display-block');
                             UICTRL.domStrings.depositConfirmPage.classList.add('u-display-block');
                             document.querySelector('.depositModal__finalAmount').textContent = `$${state.amount}`;
                             document.querySelector('.depositModal__finalAddress').textContent = `$${state.address}`;
                             /*endOf On clicking Continue */
        
                             document.addEventListener('click', e => {
        
                              /* on Click back button */ 
                                 if(e.target.id === "backBtn") {
                                     console.log('back');
                                    UICTRL.domStrings.depositChoosePage.classList.add('u-display-block');
                                    UICTRL.domStrings.depositConfirmPage.classList.remove('u-display-block');
                                 }

                                 /* on Click back button */ 
                             })
        
                        
                 
                             
                         })
                 }
        
                    everything(state.amount)
        
                    document.addEventListener('change', (event)=> {
                        if(event.target.id== "selectPlan") {
                           everything(state.amount);
                        }
                    })
        
                    document.addEventListener('change', (event)=> {
                        if(event.target.id== "selectCurrency") {
                           everything(state.amount);
                        }
                    })
        
        
                   
        
                 
        
        
                


            }

       })
       
    }

    

}

}(UICONTROLLER, DBCONTROLLER, DEPOSITCONTROLLER))



// initialize application


document.querySelectorAll('.viewDetails').forEach(item =>{
    item.addEventListener('click', controller.init );
})


   
// Making Deposit


document.querySelector('.heading__deposit').addEventListener('click', controller.deposit)
  //  



