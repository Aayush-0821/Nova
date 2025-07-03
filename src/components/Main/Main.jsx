import React, { useContext } from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import TypingAnimation from '../TypingAnimation'
import { Context } from '../../context/Context'
import RandomLoader from '../RandomLoader'

function Main() {

    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        handlecopy,
        handleSpeech,
        typingDone
    } = useContext(Context);

    return (
        <div className='main'>
            <div className="nav">
                <p>Nova</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult ?
                    <>
                        <div className="greet">
                            <p><TypingAnimation
                                sequences={["Hello, Developer", 1000]}
                                speed={70}
                                cursor={false}
                            /></p>
                            <p><TypingAnimation
                                sequences={["Ready when you are!", 1000]}
                                speed={70}
                                cursor={false}
                                repeat={Infinity}
                            /></p>
                        </div>
                        <div className="cards">
                            <div onClick={() => onSent("Tell me a short and funny joke. Make it clean and clever — something anyone can enjoy.")} className="card">
                                <p>JokeBot</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div onClick={() => onSent("Write a short fantasy story about a cursed forest.")} className="card">
                                <p>CreativeWrite</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div onClick={() => onSent("Summarize the novel merchant of venice by shakespere")} className="card">
                                <p>Summarize</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div onClick={() => onSent("Tell about different coding languages and which is better than the other?")} className="card">
                                <p>CodeGen</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className='result-data'>
                            {loading ?
                                <RandomLoader />
                                : (<div className="result-box">
                                    <p style={{ whiteSpace: "normal", wordBreak: "break-word" }} dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                    {resultData && typingDone && (
                                    <div className="result-box2">
                                        <div className="copy-btn" onClick={()=>handlecopy(resultData)}>
                                            <img src={assets.copy_icon} alt="Copy" />
                                            <span className="tooltip">Copy</span>
                                        </div>
                                        <div className="speech-btn" onClick={()=>handleSpeech(resultData)}>
                                            <img src={assets.speaker_icon} alt="Speak" />
                                            <span className="tooltip">Read Aloud</span>
                                        </div>
                                    </div>
                                )}
                                </div>
                                )}
                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Message Nova'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onSent();
                                }
                            }}
                        />
                        <div className='img-div'>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ?
                                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                                : null
                            }
                        </div>
                    </div>
                    <p className='bottom-info'>
                        AI-generated, for reference only
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main