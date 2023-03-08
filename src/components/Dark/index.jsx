import { useEffect, useState } from "react"

function Dark() {
  const [theme, setTheme] = useState('light');
  useEffect(()=>{
      if(theme === 'dark'){
        document.documentElement.classList.add('dark');
      }else{
        document.documentElement.classList.remove('dark');
      }
  },[theme]);
  const themeMode = () =>{
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }
  return (
    <button onClick={themeMode}>
      change theme
    </button>
  )
}

export default Dark