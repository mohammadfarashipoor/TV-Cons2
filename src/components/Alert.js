import ClayAlert from '@clayui/alert';
import {useState,useEffect} from 'react'
 const Alert = (props) => {
    const [toastItems, setToastItems] = useState([]);
    useEffect(() => {
        setToastItems([...toastItems, Math.random() * 100])
    },[])
    return (
      <>
            {/* // onClick={() => setToastItems([...toastItems, Math.random() * 100])} */}
        <ClayAlert.ToastContainer>
          {toastItems.map(value => (
            <ClayAlert
              autoClose={5000}
              key={value}
              displayType={props.type}
              onClose={() => {
                setToastItems(prevItems =>
                  prevItems.filter(item => item !== value)
                );
              }}
              title={props.title}
            >{props.text}</ClayAlert>
          ))}
        </ClayAlert.ToastContainer>
      </>
    );
  };

  export default Alert  
  