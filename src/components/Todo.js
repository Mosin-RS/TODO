import React, {useState, useEffect} from 'react'
 import '../App.css';
import todologo from "../images/icons8-list-64.png";


const getLocalItem = () =>{
    let list = localStorage.getItem('lists');

    if (list){
        return JSON.parse( localStorage.getItem('lists'));
    }else{
        return [];
    }
    
}
const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItem());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const addItem = () => {
        if(!inputData){
                alert("No Item to add");
        }else if(inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if(elem.id === isEditItem){
                        return{...elem, name:inputData}
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
    }else{
            const allInputData = { id: new Date().getTime().toString(), name:inputData}
            setItems([...items, allInputData]);
            setInputData('');
        }
        
    }

    const editItem = (id) => {
        let newEditItem = items.find((elem) =>{
                return elem.id === id
        });
        
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);

    }
    const deleteItem = (index) => {
        const updateditem = items.filter((elem) => {
            return index !== elem.id;
        });
            setItems(updateditem);
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items));
    }, [items]);

  return (
    <>
      <div className='container'>
        <div className='row'>
            <div className="col-md-4 offset-md-4">
                <div className='main-box'>
                        <figure>
                        <img src={todologo} alt=''/>

                        <figcaption>Add Your List Here</figcaption>
                    </figure>

                    <div className='main-form'>
                        <input type="text" placeholder="Add Items..." value={inputData} onChange={(e)=> setInputData(e.target.value)}/>
                        {
                            toggleSubmit ? <i className="fa-solid fa-plus add-item" title='Add Item' onClick={addItem}></i> : 
                            <i className="fa-solid fa-edit add-item" title='Update Item' onClick={addItem}></i>
                        }
                        
                    </div>

                    <div className='showItems '>
                        
                            {
                                items.map((elem) =>{
                                    return(
                                        <div className='eachItem ' key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <i className="fa-solid fa-edit add-item" title='Edit Item' onClick={() =>editItem(elem.id)}></i>
                                        <i className="fa-solid fa-trash-alt add-item" title='Delete Item' onClick={() =>deleteItem(elem.id)}></i>
                                        </div>                                       
                                    )
                                })
                            }
                        
                    </div>

                    
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo
