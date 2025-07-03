import { createContext, useState } from "react";
import queryAI from "../config/nova";
import Swal from 'sweetalert2'

export const Context = createContext();

const ContextProvider = (props) =>{

    const[input,setInput] = useState("");
    const[recentPrompt,setrecentPrompt] = useState("");
    const[prevPrompt,setprevPrompt] = useState([]);
    const[showResult,setshowResult] = useState(false);
    const[loading,setloading] = useState(false);
    const[resultData,setresultData] = useState("");
    const[typingDone,setTypingDone] = useState(false);

    const startTyping = (wordsArray) =>{
        setresultData("")
        setTypingDone(false);
        wordsArray.forEach((word,index)=>{
            delayPara(index,word);
            if(index===wordsArray.length-1){
                setTimeout(()=>{
                    setTypingDone(true);
                },80*index+100)
            }
        });
    };

    const delayPara = (index,nextWord)=>{
        setTimeout(function(){
            setresultData(prev=>prev+nextWord);
        },50*index)
    }

    const handlecopy=(text)=>{
        navigator.clipboard.writeText(text)
        .then(()=>Swal.fire({
            title:"Copied !",
            icon:'success',
            timer:2000,
            showConfirmButton:false
        }))
        .catch(()=>Swal.fire({
            title:'Copy Failed',
            text:'Failed',
            timer:3000,
            showConfirmButton:false
        }));
    };

    const handleSpeech=(text)=>{
        if(!window.speechSynthesis){
            Swal.fire({
                title:'Speech Failed',
                text:'Speech not Supported',
                timer:2000,
                showConfirmButton:false
            })
            return;
        }
        const speech= new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    };

    const newChat = ()=>{
        setloading(false)
        setshowResult(false)
    }

    const onSent = async (prompt) =>{
        try {
            setresultData("")
            setloading(true)
            setshowResult(true)
            let response;
            if(prompt !== undefined){
                response= await queryAI(prompt);
                setrecentPrompt(prompt);
            }
            else{
                setprevPrompt(prev=>[...prev,input])
                setrecentPrompt(input)
                response = await queryAI(input);
            }
            let responseArray=response.split("**");
            let newResponse="";
            for(let i=0;i<responseArray.length;i++){
                if(i===0 || i%2!==1){
                    newResponse+=responseArray[i];
                }
                else{
                    newResponse+="<b>"+responseArray[i]+"</b>";
                }
            }
            let newResponse2=newResponse.split("*").join("</br>")
            let newResponseArray = newResponse2.split(" ");
            startTyping(newResponseArray.map(word=>word+" "));
            setloading(false)
            setInput("")
        } catch (error) {
            throw error;
        }
    }

    const contextValue={
        prevPrompt,
        setprevPrompt,
        onSent,
        setrecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        handlecopy,
        handleSpeech,
        typingDone
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider