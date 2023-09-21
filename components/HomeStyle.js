import styled from 'styled-components';

export const PageContainer=styled.div`
    padding-top: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    align-items: center;
    background-color:#FFEFDB;
    `;

export const Title=styled.h3`
    @import url('https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@700&family=Creepster&display=swap');
    font-family: 'Cabin Sketch', cursive;
    `;

export const SubTitle=styled.h1`
    @import url('https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@700&family=Creepster&display=swap');
    font-family: 'Cabin Sketch', cursive;
    `;
const mediaQuery = '@media (max-width: 600px)'; // Nastavte hodnotu podle potřeby

export const DogList = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    background: transparent;
    max-width: 45%;
    margin: 0 auto;
    ${mediaQuery} {
    max-width: 100%; /* Na malých obrazovkách zabere celou šířku */
  }
`;
export const DogItem = styled.div`
    display: flex;
    height: 45px;
    padding: 0 15px;
    align-items: center;
    justify-content: space-between;
    background-color:#FFDAB9;
    &:nth-child(even) {
        background-color:#CDAF95;
    }
    
    /* Použijeme media query pro menší šířky obrazovek */
    ${mediaQuery} {
        padding: 0 5px; /* Upravený padding pro menší šířky */
    }
`;

export const DogForm = styled(DogList)`
    flex-direction: row;
    margin: 50px 0;
    padding-top: 0;
    justify-content: space-between;
    align-items: center;
`;

export const Input = styled.input`
    width: 130px;
    height: 25px;
    padding-left: 10px;
    
    ${mediaQuery} {
        width: 80px; /* Menší šířka inputu na menších obrazovkách */
    }
`;
export const Button = styled.button`
    width: 130px;
    height: 25px;
    
    ${mediaQuery} {
        width: 80px; /* Menší šířka tlačítka na menších obrazovkách */
    }
`;
export const Buttons=styled(DogForm)`
    margin: 30px 0;
    height: 40px;
`;

export const TabButtons=styled.button`
    display:flex;
    text-align:center;
    align-items:center;
    justify-content:center;
    height:100%;
    width:48%;
    border:1px solid #FFDAB9;
    color:black;
    font-size:20px;
    cursor: pointer;
    background-color:transparent;
    ${(props) => {
        if (props.name === props['data-active']){
            return `
              background-color:#FFDAB9  
            `;
        }
    }}
`;

export const ShelterForm=styled(DogForm)`
    flex-direction:column;
`;