/* eslint-disable */
import React, {useState} from 'react';
import Button from '@aragon/ui/dist/Button';
import {Tabs, Bar, BackButton} from '@aragon/ui'
import Box from '@aragon/ui/dist/Box';


function Details(){
    const [selected, setSelected] = useState(0)
    
      
        const titleStyle = {
        color : "#8492A4",
        fontSize : "0.7rem"
    }

    const headingElement = <h1>Consenso Corp<span>11/11/2020</span></h1> 

    function goBack(){
        console.log(("cliked"))
    }

    const [selected, setSelected] = useState(0)

    return(
        <>
        <Bar primary={<BackButton onClick={() => goBack()} />} />
        <div style={{border : "1px solid #E8E8E8"}}>
        <header style={{ backgroundColor : "pink" , display : "grid", gridTemplateColumns : "1fr 4fr 1fr"}}>
            <div style={{justifySelf : "center", display : "flex", flexDirection : "column", justifyContent : "center"}}>icon</div>
            <div style={{fontSize : "1.5rem", display : "flex", flexDirection : "column", justifyContent : "center"}}>Consenso Corp Project Delivery Dispute</div>
            <div style={{ display : "flex", flexDirection : "column", justifyContent : "center"}} ><Button mode="tiny" label="REQUESTED"/></div>
        </header>
        <div className="a" style={{padding : "4rem 1rem 2rem 1rem" , backgroundColor : "orangered", display : "grid", gridGap : "1rem"}}>
            <div style={{justifySelf : "start"}}>
                <div>
                    <div style={{fontSize : "0.7rem"}}>DESCRIPTION</div>
                    <div>Consenso Corp claims that the the Apple Inc was unable to deliver the 
                        project for the promised price
                    </div>
                </div>
                <div style={{marginTop : "2rem"}}>
                    <div style={{fontSize : "0.7rem"}}>ARBITRATION AGREEMENT</div>
                    <div>Apple Inc - Consenso Corp Agreement</div>
                </div>
            </div>
            <div className="b" style={{justifySelf : "center"}}>
                <div>
                    <p style={{fontSize : "0.7rem"}}>CLAIMANT</p>
                    <p>(icon) Consenso Corp</p>
                </div>
                <div style={{marginTop : "2rem"}}>
                    <p style={{fontSize : "0.7rem"}}>TRIBUNAL</p>
                    <p>(icon) Manchester Law</p>
                </div>
                <div style={{marginTop : "2rem"}}>
                    <p style={{fontSize : "0.7rem"}}>RESPONDANT</p>
                    <p>(icon) Apple Inc</p>
                </div>
            </div>
        </div>
        <div>
        <Tabs
        items={['Statements', 'Agreements']}
        selected={selected}
        onChange={setSelected}

        
    />
    <Box heading={headingElement} />
    </div>
    </div>
        </>
    )

        
    
}

export default Details;