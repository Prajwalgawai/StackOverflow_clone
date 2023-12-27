import React, { useState, useRef, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import "./AskQuestion.css";
import { useDispatch, useSelector } from "react-redux";
import { askQuestion } from "../../actions/question.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AskQuestion = () => {
  const editorRef = useRef();
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const [videoLoad, setVideoLoad] = useState("");
  const [imageLoad, setImageLoad] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  const [selectedText, setSelectedText] = useState("");
  const [isCodeBlockActive, setIsCodeBlockActive] = useState(false);



  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const User2 = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  let theme = useSelector((state) => state.fetchWeather);
  theme=theme?.data

  useEffect(() => {
    const handleLinkClick = (e) => {
      let target = e.target;

      if (target.tagName === "A") {
        e.preventDefault();
        const url = target.getAttribute("href");
        if (url) {
window.open("/"+url, '_blank')
        }
      }
    };

    const editorElement = editorRef.current;
    editorElement.addEventListener("click", handleLinkClick);

    return () => {
      editorElement.removeEventListener("click", handleLinkClick);
    };
  }, []);



  
  const handleCursorPosition = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setCursorPosition(range.endOffset);
    }
  };

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    handleCursorPosition();
  };

  const handleInsertLink = () => {
    const url = prompt("Enter the URL:");

    if (url) {
      document.execCommand(
        "insertHTML",
        false,
        `<a href="/${url}" target="_blank">${url}</a>`
      );
      handleCursorPosition();
    }
  };

  const handleInsertHeading = (level) => {
    handleFormat("formatBlock", `<h${level}>`);
  };

  const handleInsertList = (type) => {
    handleFormat(`insert${type}List`);
  };

  const handleVideo = (e) => {
    if (e.target.files.length !== 0) {
      const file = e.target.files[0];
  

      const maxSize = 15 * 1024 * 1024; // 15MB in bytes
      if (file.size > maxSize) {
        alert('File size exceeds 15MB. Please choose a smaller video.');
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        setVideoLoad(reader.result);
        const videoUrl = reader.result;
        const videoElement = `<video controls width="220" height="240"><source src="${videoUrl}" type="video/mp4"></video>`;
        const cursorContent = editorRef.current.innerHTML.slice(cursorPosition);
        const newContent = editorRef.current.innerHTML.replace(cursorContent, videoElement + cursorContent);
        editorRef.current.innerHTML = newContent;
        handleCursorPosition();
      };
  
      reader.readAsDataURL(file);
    }
  };

  const handleImage = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageLoad(reader.result);
        const imageUrl = reader.result;
        const imageElement = `<img classname="imageelement1" src="${imageUrl}" alt="Uploaded Image" width="320" height="240">`;
        const cursorContent = editorRef.current.innerHTML.slice(cursorPosition);
        const newContent = editorRef.current.innerHTML.replace(cursorContent, imageElement + cursorContent);
        editorRef.current.innerHTML = newContent;
        handleCursorPosition();
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Uid = User2?.result?._id;
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody: editorRef.current.innerHTML,
          questionTags,
          userPosted: User?.result.name,
          userId: Uid,
        },
        navigate
      )
    );
  };


 
  const handleCodeBlock = () => {
    const editorElement = editorRef.current;
  
    if (!isCodeBlockActive) {
      const selection = window.getSelection();
      const selectedText = selection.toString();
  
      if (selectedText.trim() !== "") {
        setSelectedText(selectedText);
        selection.removeAllRanges();
        setIsCodeBlockActive(true);
      }
    } else {
      const selection = window.getSelection();
  
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
  

        const codeBlockElement = document.createElement("pre");
        codeBlockElement.className = "code-block";
        codeBlockElement.textContent = selectedText;

        range.deleteContents();
        range.insertNode(codeBlockElement);
  
        setIsCodeBlockActive(false);
      }
    }
  };
  
  
  
  
  

  return (
    <div className={`${theme !== "dark" ? "ask-question" : "ask-question-dark"}`}>
      <div className={`${theme !== "dark" ? "ask-ques-container" : "ask-ques-container-dark"}`}>
        <h1>Ask a public Question </h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>Be specific and imagine you're asking a question to another person</p>
              <input
                type="text"
                placeholder="e.g Is there an R function for finding the index of an element in a vector?"
                id="ask-ques-title"
                onChange={(e) => setQuestionTitle(e.target.value)}
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>Include all the information someone would need to answer your question</p>
              <div className="editor1">
                <div className="editor-tools">

<div>


                 <label   htmlFor='bold'><img src="./bold.svg" alt="" /></label>
                  <button type="button" id="bold" onClick={() => handleFormat("bold")}>
                    Bold
                  </button>
                  </div>
                  <div>

                 
                  <label  htmlFor='italic'><img src="./italic.svg" alt="" /></label>
                  <button type="button" id="italic" onClick={() => handleFormat("italic")}>
                    Italic
                  </button>
                  </div>

                  <div>
                    
                  <label    htmlFor='link'><img src="./link-solid.svg" alt="" /></label>
                  <button type="button"  id="link" onClick={handleInsertLink}>
                    Link
                  </button>
                  </div>

                  <div>
                  <label    htmlFor='h'><img src="./heading.svg" alt="" /></label>
                  <button type="button" id="h" onClick={() => handleInsertHeading(3)}/>
                  </div>
                
<div>
                  <label    htmlFor='ul'><img src="./list-solid.svg" alt="" /></label>
                  <button type="button" id="ul" onClick={() => handleInsertList("Unordered")}>
                    Bullets List
                  </button>
                  </div>

<div>
                  <label   htmlFor='ol'><img src="./list-ol-solid.svg" alt="" /></label>
                  <button type="button" id="ol" onClick={() => handleInsertList("Ordered")}>
                    Number List
                  </button>
                  </div>

               
             <div>
                  <label    htmlFor='cd'><img src="./code-solid.svg" alt="" /></label>
                  <button type="button" id="cd" onClick={handleCodeBlock}>
  {isCodeBlockActive ? 'Insert Code Block' : 'Code Block'}
</button>
</div> 
                  

<div>
                  <label   htmlFor='image'><img src="./image-solid.svg" alt="" /></label>
                  <input type="file" id="image" accept="image/*" onChange={handleImage} style={{display:"none"}}/>
                  </div>

<div>
                  <label   htmlFor='video'><img src="./video-solid.svg" alt="" /></label>
                  <input type="file" accept="video/*" onChange={handleVideo} id="video" style={{display:"none"}}/>
                  </div>                         
                 
                </div>
                <div
                  name="ask-ques-body"
                  id="ask-ques-body"
                  contentEditable
                  ref={editorRef}
                  className="editor"
                  onInput={handleCursorPosition}
                  style={{height:"220px"}}
                />
              </div>
            </label>
            <label htmlFor="ask-ques-tags">
              <h2>Tags</h2>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                placeholder="e.g. {xml typescript wordpress}"
                id="ask-ques-tags"
                onChange={(e) => setQuestionTags(e.target.value.split(" "))}
              />
            </label>
          </div>
          <input
            type="submit"
            value="Review your question"
            className={`${theme !== "dark" ? "review-btn" : "review-btn-dark"}`}
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
