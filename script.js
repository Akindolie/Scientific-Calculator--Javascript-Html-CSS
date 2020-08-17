
        let oneBtn = document.getElementById('calc-one');
        let twoBtn = document.getElementById('calc-two');
        let threeBtn = document.getElementById('calc-three');
        let fourBtn = document.getElementById('calc-four');
        let fiveBtn = document.getElementById('calc-five');
        let sixBtn = document.getElementById('calc-six');
        let sevenBtn = document.getElementById('calc-seven');
        let eightBtn = document.getElementById('calc-eight');
        let nineBtn = document.getElementById('calc-nine');
        let zeroBtn = document.getElementById('calc-zero');

        let equalsBtn = document.getElementById('calc-equals');
        let decimalBtn = document.getElementById('calc-decimal');
        let clearBtn = document.getElementById('calc-clear');
        let backspaceBtn = document.getElementById('calc-backspace');
        let displayValElement = document.getElementById('calc-display-val');
        let fnName;
        

        let displayVal = '0';
        let pendingVal;
        let evalStringArray = [];
        let answer;

        let calcNumBtns = document.getElementsByClassName('calc-btn-num');
        let calcOperatorBtns = document.getElementsByClassName('calc-btn-operator');
        let calcFuncBtns =  document.getElementsByClassName('calc-btn-func');
        let calcRootBtns = document.getElementsByClassName('calc-btn-root');
    
        let func;
        let sign;
        let simpleFn;
      
        
    let updateFunc = (clickObj)=>{
        func = clickObj.target.innerText;
        
        simpleFn = clickObj.target.getAttribute("data-func")
        let specialFn = func === "sin" ||func === "cos" ||func === "tan" ||func === "log10" ||func === "sinh" ||func === "cosh" || func ==="tanh" ||func === "log"
        let isSimple = simpleFn === "squareroot" || simpleFn ==="square" ||simpleFn === "cubesqr" ||simpleFn === "cuberoot";
        // console.log(isSimple,specialFn);
        if(specialFn){
            displayVal =func;
            displayValElement.innerHTML = func;
            fnName = func;
           
        }

        if(isSimple){
            displayVal =func;
            displayValElement.innerHTML = displayVal; 
            fnName = simpleFn
           
        }
          
    }

    let updateDisplayVal = (clickObj) => { 
            let btnText = clickObj.target.innerText;
            

            if(displayVal === '0')
                displayVal = '';

            displayVal += btnText;
            displayValElement.innerText = displayVal;

    } 

    let updateRoot = (clickObj) => {
            charSign =clickObj.target.getAttribute("data-sign")
            sign = String.fromCharCode(charSign)
            displayVal +=sign;
            displayValElement.innerHTML = displayVal;
            fnName = sign;
    }

    
        
        let performOperation = (clickObj) => {
            let operator = clickObj.target.innerText;
            if (fnName){
                let val = parseFloat(displayValElement.textContent.match(/\d/g).join(""))
                switch(fnName){
                    case 'sin':
                        displayVal=  Math.sin((Math.PI/180)*val).toFixed(4);
                       
                        displayValElement.innerText = displayVal;
                        evalStringArray.push(displayVal);
                        console.log(evalStringArray)
                        break;
                    
                    case '²':
                        displayVal=  Math.pow(val,2);
                      
                        displayValElement.innerText = displayVal; 
                        evalStringArray.push(pendingVal);
                       
                        
                        break;

                    case '³':
                        displayVal=  Math.pow(val,3).toFixed(4);
                        pendingVal = displayVal;
                        break;
                    case 'cos':
                        displayVal = Math.cos((Math.PI/180)*val).toFixed(4);
                        pendingVal = displayVal;
                        break;
        
                    case 'tan':
                        displayVal = Math.tan((Math.PI/180)*val).toFixed(4);
                        pendingVal = displayVal;
                        break;

                    case 'sinh':
                            displayVal=  Math.sinh((Math.PI/180)*val).toFixed(4);
                            pendingVal = displayVal;
                        break;
                        
                    case 'cosh':
                            displayVal = Math.cosh((Math.PI/180)*val).toFixed(4);
                            pendingVal = displayVal;
                        break;
            
                    case 'tanh':
                            displayVal = Math.tanh((Math.PI/180)*val).toFixed(4);
                            pendingVal = displayVal;
                        break;

                    case 'log10':
                        displayVal = Math.log10(val).toFixed(4);
                       
                        displayValElement.innerText = displayVal;
                        evalStringArray.push(pendingVal);
                        evalStringArray.push('log');
                        break;

                    case 'log':
                            displayVal = Math.log(val).toFixed(4);
                            pendingVal = displayVal;
                        break;


                    case 'squareroot':
                    
                        displayVal = Math.sqrt(val,2).toFixed(4);
                        console.log(val)
                       
                        break;

                    case 'cuberoot':
                    
                            displayVal = Math.cbrt(val).toFixed(4);
                            
                           
                        break;
                    case 'ℼ':
                        displayVal = ((displayVal) *22/7);
                        console.log(val)
                        break;
                
               
                    default :
                        break;
                }
            }
            
            switch(operator){
                case '+':
                    fnName = "";
                    displayVal = test(displayVal,'+');
                    console.log(evalStringArray)
                    break;

                case '-':
                    displayVal = test(displayVal,'-');
                     break;
                case 'x':
                    fnName = '';
                    displayVal = test(displayVal,'*');
                    break;

                case '÷':
                    displayVal = test(displayVal,'/');
                    break;

                

                case 'Mod':
                    displayVal = test(displayVal,'%');
                    break;

                case '10ⁿ':
                        pendingVal = displayVal;
                        displayVal = '';
                        displayValElement.innerText = displayVal;
                        evalStringArray.push(10);
                        evalStringArray.push('**');
                    break;

                    case 'xⁿ':
                        pendingVal = displayVal;
                        displayVal = '';
                        displayValElement.innerText = displayVal;
                        evalStringArray.push(pendingVal);
                        pendingVal = '';
                        evalStringArray.push('**');
                    break;

                case '=':
                  
                    evalStringArray.push(displayVal);
                    console.log(displayVal)
                    pendingVal = displayVal;
                    
                     var evaluation = eval(evalStringArray.join(''));
                    displayVal = evaluation + '';
                    displayValElement.innerText = displayVal;
                    evalStringArray = [];
                    break;
                default:
                    break;
            }

        }
        
        for (let i = 0; i < calcNumBtns.length; i++) {
            calcNumBtns[i].addEventListener('click', updateDisplayVal, true);
        }

        for (let i = 0; i < calcOperatorBtns.length; i++) {
            calcOperatorBtns[i].addEventListener('click', performOperation, true);
        }

        for (let i = 0; i < calcFuncBtns.length; i++) {
            calcFuncBtns[i].addEventListener('click', updateFunc, false);
        }

        for (let i = 0; i < calcRootBtns.length; i++) {
            calcRootBtns[i].addEventListener('click', updateRoot, false);
        }

        test = (y,op)=>{
            pendingVal = y;
            y = '0';
            displayValElement.innerText = y;
            evalStringArray.push(pendingVal);
            evalStringArray.push(op);
            return y;
        }


        clearBtn.onclick = () => {
            displayVal = '0';
            pendingVal = undefined;
            evalStringArray = [];
            displayValElement.innerHTML = displayVal;
        }
        backspaceBtn.onclick = () => {
            let LenghtOfDisplayVal = displayVal.length;
            displayVal = displayVal.slice(0, LenghtOfDisplayVal - 1)

            if(displayVal === '')
                displayVal = '0';

            displayValElement.innerText = displayVal;
        }
        decimalBtn.onclick = () => {
            if(!displayVal.includes('.'))
                displayVal += '.';
            displayValElement.innerText = displayVal;
        }

    