import "./styles.css";
import React, {useEffect, useRef, useState} from "react"

export default function App() {
  const [preview, setPreview] = useState<string>("")
  const formRef = useRef<HTMLFormElement>(null!);
  const getFormData = ()=>{
    const formData = new FormData(formRef.current)
    const fieldValue = formData.get("markdown");
    console.log(fieldValue)
    return `${fieldValue}`
  }

  const submitMarkdownForm = async (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const markdown = getFormData();
    console.log(markdown)
    
    const res = await fetch('https://api.github.com/markdown', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'mode': 'markdown', 'text': markdown})
    })
    console.log(res)
    const htmlText = await res.text();
    console.log(htmlText)
    setPreview(htmlText);
  }

  useEffect(()=>{
    getFormData()
  },[])
  return (
    <div className="App">
      <h1>using github markdown rest api</h1>
      <h2>Start editing to see some magic happen!</h2>
    <form action="" onSubmit={submitMarkdownForm} id="markdownForm" ref={formRef}>
      <textarea name="markdown" id="markdown" cols="30" rows="10" placeholder="write your markdown"></textarea>
    <input type="submit" value="submit"/>
    </form>
    <section dangerouslySetInnerHTML={{__html: preview}}>
    </section>
    </div>
  );
}
