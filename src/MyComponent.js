import React, { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  const [address, setAddress] = useState("");
  return (
    <div className="App">
      <div>
        <img src={logo} alt="drizzle-logo" />
        <h1>My Drizzle</h1>
      </div>

      <div className="section">
        <h2>Active Account</h2>
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={0}
          units="ether"
          precision={3}
        />
      </div>


      <div className="section">
        <h2>MarketPlace</h2>
        <p>EVALUATION</p>
        <p>
          Créer un shipping contract (contrat d'expédition)
Le smart contract que vous allez créer effectue le suivi de l’état des éléments achetés sur une marketplace en ligne. Lorsque le contrat est créé, l’état de l’expédition est défini sur Pending. Lorsqu’un article est expédié, l’état de l’expédition est défini sur Shipped et un événement est émis. Une fois la livraison exécutée, l’état d’expédition de l’élément est défini sur Delivered et un autre événement est émis.
        </p>
        <h2>List des items disponibles :</h2>
        <ul>
          <li>0- Renault</li>
          <li>1- Audi</li>
          <li>2- BMW</li>
          <li>3- Fiat</li>
        </ul>
        <p>
          <strong>Index of item that you want to buy: </strong>
        </p>

        <ContractForm
          drizzle={drizzle}
          contract="MarketPlace"
          method="buy"
          labels={["Index of item to buy", "Address"]}
        />

        <p>
          <strong>Item owned by address: </strong>
        </p>

        <input
          type="text"
          placeholder="Enter address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />

        {address !== "" && <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="MarketPlace"
            method="getItem"
            methodArgs={[address]}
          />}
        <p>
          <strong>Ship item: </strong>
        </p>
        <ContractForm
          drizzle={drizzle}
          contract="MarketPlace"
          method="ship"
          labels={["Index of item to ship"]}
        />
        <p>
          <strong>Deliver item : </strong>
        </p>
        <ContractForm
          drizzle={drizzle}
          contract="MarketPlace"
          method="delivered"
          labels={["Index of item delivered", "Address"]}
        />
        <p>
          <strong>Tip delivery man: </strong>
        </p>
        <ContractForm
          drizzle={drizzle}
          contract="MarketPlace"
          method="tip"
          labels={["Index of item"]}
        /> 
      </div>

      <div className="section">
        <h2>Migrations</h2>
        <p>
          This shows a simple ContractData component with no arguments, along
          with a form to set its value.
        </p>
        <p>
          <strong>Stored Value: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="Migrations"
            method="last_completed_migration"
          />
        </p>
        <ContractForm drizzle={drizzle} contract="Migrations" method="setCompleted" />
      </div>


      <div className="section">
        <h2>M4XToken</h2>
        <p>
          Here we have a form with custom, friendly labels. Also note the token
          symbol will not display a loading indicator. We've suppressed it with
          the <code>hideIndicator</code> prop because we know this variable is
          constant.
        </p>
        <p>
          <strong>Total Supply: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="M4xToken"
            method="totalSupply"
            methodArgs={[{ from: drizzleState.accounts[0] }]}
          />{" "}
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="M4xToken"
            method="symbol"
            hideIndicator
          />
        </p>
        <p>
          <strong>My Balance: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="M4xToken"
            method="balanceOf"
            methodArgs={[drizzleState.accounts[0]]}
          />
        </p>
        <h3>Send Tokens</h3>
        <ContractForm
          drizzle={drizzle}
          contract="M4xToken"
          method="transfer"
          labels={["To Address", "Amount to Send"]}
        />
      </div>

      {/* <div className="section">
        <h2>TutorialToken</h2>
        <p>
          Here we have a form with custom, friendly labels. Also note the token
          symbol will not display a loading indicator. We've suppressed it with
          the <code>hideIndicator</code> prop because we know this variable is
          constant.
        </p>
        <p>
          <strong>Total Supply: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TutorialToken"
            method="totalSupply"
            methodArgs={[{ from: drizzleState.accounts[0] }]}
          />{" "}
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TutorialToken"
            method="symbol"
            hideIndicator
          />
        </p>
        <p>
          <strong>My Balance: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="TutorialToken"
            method="balanceOf"
            methodArgs={[drizzleState.accounts[0]]}
          />
        </p>
        <h3>Send Tokens</h3>
        <ContractForm
          drizzle={drizzle}
          contract="TutorialToken"
          method="transfer"
          labels={["To Address", "Amount to Send"]}
        />
      </div>

      <div className="section">
        <h2>ComplexStorage</h2>
        <p>
          Finally this contract shows data types with additional considerations.
          Note in the code the strings below are converted from bytes to UTF-8
          strings and the device data struct is iterated as a list.
        </p>
        <p>
          <strong>String 1: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ComplexStorage"
            method="string1"
            toUtf8
          />
        </p>
        <p>
          <strong>String 2: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ComplexStorage"
            method="string2"
            toUtf8
          />
        </p>
        <strong>Single Device Data: </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="ComplexStorage"
          method="singleDD"
        />
      </div> */}
    </div>
  );
};
