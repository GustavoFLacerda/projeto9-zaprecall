import React from 'react';
import Flashcard from './Flashcard'
import styled from 'styled-components';
import logo from './img/logo.png'
import { useState } from 'react';
import icone_certo from './img/icone_certo.png'
import icone_quase from './img/icone_quase.png'
import icone_erro from './img/icone_erro.png'


const App = () => {
    const deck1 = [{pergunta: "O que é JSX", resposta:"sim"}, 
                   {pergunta:"O React é", resposta:"não"},
                   {pergunta: "Componentes devem iniciar com", resposta: "talvez"}]
    const deck2 = [{pergunta: "Pergunta1", resposta:"sim"}, 
                   {pergunta:"Pergunta2", resposta:"não"},
                   {pergunta: "Pergunta3", resposta: "talvez"}]
    
    const [resultados, setResultados] = useState([]);
    const [iniciado, setIniciado] = useState(false);
    const [deck, setDeck] = useState(deck1);
    const [meta, setMeta] = useState(0);
    const [zaps, setZaps] = useState(0);
    const [deckEscolhido, setDeckEscolhido] = useState(false);
 
    function iniciar(){
        setIniciado(true);
    }
    
    function definirdeck(e){
        if(e.target.value === "deck1"){
            setDeck(deck1);
        }
        else{
            setDeck(deck2);
        }
        setDeckEscolhido(true);
    }

    function definirmeta(e){
        setMeta(e.target.value);
    }

    return(
        <>
        {!iniciado?
        <ScreenContainer>
        <LogoContainer>
            <img src={logo}></img>
            <h1>Zap Recall</h1>
        </LogoContainer>
        {deckEscolhido === false?
            <select>
            <option value="deck1" onClick={definirdeck}>Deck 1</option>
            <option value="deck2" onClick={definirdeck}>Deck 2</option>
            </select>
            :
            <input type="number" min="1" max={deck.length} onChange={definirmeta}></input>
        }
        <button onClick={iniciar}>Iniciar</button>
        </ScreenContainer>
        :
        <ScreenContainer>
        <LogoContainer>
            <img src={logo}></img>
            <h1>ZapRecall</h1>
        </LogoContainer>
        {deck.map((e, index) => {
            return(
                <Flashcard 
                pergunta={e.pergunta}
                resposta={e.resposta} 
                num={index}
                setResultados={setResultados}
                resultados={resultados}
                zaps = {zaps}
                setZaps = {setZaps}
                />
            )
        })}
        {(resultados.length !== deck.length)? <></>
            :
            (zaps - meta === 0 ?
                <h1>Você concluiu sua meta!</h1>
                :
                <h1>Você não concluiu sua meta...</h1>
                
            )
        }
        <FooterConcluidos>
            <h1>{resultados.length}/{deck.length} concluídos</h1>
            <div>
        {resultados.map(resultado =>{
            let a = <></>
            if(resultados.length === deck.length){
                if(resultado === "Zap!"){
                    a = <img src={icone_certo}></img>
                }
                else if(resultado === "Quase não lembrei"){
                    a = <img src={icone_quase}></img>
                }
                else if(resultado ==="Não lembrei"){
                    a = <img src={icone_erro}></img>
                }
            }
            return a;
        })}
        </div>
        </FooterConcluidos>
        </ScreenContainer>
        }
        </>
    )
}











const ScreenContainer = styled.div`
background-color: #FB6B6B;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px;
    padding: 0px;
    padding-bottom: 200px;
`
const LogoContainer = styled.header`
display: flex;
    align-items: center;
    margin: 40px 0 20px 0;
img{
    width: 52px;
}
h1 {
    font-family: 'Righteous';
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 45px;
    color: #FFFFFF;
    margin-left: 20px;
  }
`

const FooterConcluidos = styled.footer`
    width: 100%;
    min-height: 50px;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Recursive';
    font-weight: 400;
    font-size: 18px;
    color: #333333;
    padding: 10px;
    div{
        display: flex;
    }
    h1{
        font-size: 15px;
        font-weight: normal;
    }
`

export default App;