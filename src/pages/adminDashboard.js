import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddItemModal from './AddItemModal';
import { getDatabase, ref, set, remove, get, onValue, update} from "firebase/database";


function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [auctionName, setAuctionName] = useState('Default Auction Name');
  const [round, setRound] = useState(1);  
  const [airtelList, setAirtelList] = useState([]);
  const [rjioList, setRjioList] = useState([]);
  const [attList, setAttList] = useState([]);
  const [bsnlList, setBsnlList] = useState([]);
  const [viList, setViList] = useState([]);
  const location = useLocation();
  useEffect(() => {
    // Extract auctionName from the path parameters
    const { pathname } = location;
    const parts = pathname.split('/');
    const lastPart = parts[parts.length - 1];

    // Set auctionName to the last part of the path
    setAuctionName(lastPart || 'Default Auction Name');
  }, [location.pathname]);

  const openModal = () => {
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addItem = (item) => {
    setItems([...items, item]);
    closeModal();
  };
  const deleteAuction = () =>{
    console.log("Deleting Auction !")
    const db = getDatabase();
    remove(ref(db, `Auctions/${auctionName}`));
    console.log("Deleted Auction Successfully !");
  }

  const handleStartTimer = () => {
    const db = getDatabase();
    const startTime = Date.now();
    setRound(round + 1);
    console.log(round);
    set(ref(db, `Auctions/${auctionName}/timerData`), {
      start: startTime,
      time: 1,
      round: round
    });
    newRound();
  }



  const newRound = () => {
    const db = getDatabase();
    const refPath = `Auctions/${auctionName}/Items`;
    const itemsRef = ref(db, refPath);
    const newCartItems = [];
    get((itemsRef)).then((snapshot) => {
      const data = snapshot.val();
      Object.keys(data).forEach((freqBand) => {
        Object.keys(data[freqBand]).forEach((region) => {
          const newItem = {
            operator: region,
            frequencyBand: freqBand,
            unpaired: data[freqBand][region].unpairedBlocks,
            paired: data[freqBand][region].pairedBlocks,
            reservedPrice: data[freqBand][region].reservedPrice,
            epPerBlock: data[freqBand][region].epPerBlock,
            qty: 0
          };
          newCartItems.push(newItem);
        });
      });
    })
    const refPath2 = `Auctions/${auctionName}/companyHistory`;
    const itemsRef2 = ref(db, refPath2);
    get((itemsRef2)).then((snapshot) => {
      const data = snapshot.val();
      data["companyMapping"]["airtel"][round] = newCartItems;
      data["companyMapping"]["rjio"][round] = newCartItems;
      data["companyMapping"]["att"][round] = newCartItems;
      data["companyMapping"]["bsnl"][round] = newCartItems;
      data["companyMapping"]["vi"][round] = newCartItems;
      console.log(data["companyMapping"]);
      const companyMapping = data["companyMapping"]
      set(ref(db, `Auctions/${auctionName}/companyHistory`), {
        companyMapping
      });
    })
  }

// ----------------------- Result Calculation -------------------------------------

const publishResult = () => {
    const db = getDatabase();
    console.log(round);
    const listOfItemsForAirtel = ref(db, `Auctions/${auctionName}/companyHistory/companyMapping/airtel/1/`);
    onValue(listOfItemsForAirtel, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        setAirtelList(data);
      } else {
        console.log("Data is null or empty");
      }
    }); 
    const listOfItemsForRjio = ref(db, `Auctions/${auctionName}/companyHistory/companyMapping/rjio/1/`);
    onValue(listOfItemsForRjio, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        setRjioList(data);
      } else {
        console.log("Data is null or empty");
      }
    }); 
    const listOfItemsForVi = ref(db, `Auctions/${auctionName}/companyHistory/companyMapping/vi/1/`);
    onValue(listOfItemsForVi, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        setViList(data);
      } else {
        console.log("Data is null or empty");
      }
    }); 
    const listOfItemsForAtt = ref(db, `Auctions/${auctionName}/companyHistory/companyMapping/att/1/`);
    onValue(listOfItemsForAtt, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        setAttList(data);
      } else {
        console.log("Data is null or empty");
      }
    }); 
    const listOfItemsForBsnl = ref(db, `Auctions/${auctionName}/companyHistory/companyMapping/bsnl/1/`);
    onValue(listOfItemsForBsnl, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        setBsnlList(data);
      } else {
        console.log("Data is null or empty");
      }
    }); 
}

const check = () => {
  console.log(airtelList);
  const db = getDatabase();
  airtelList.forEach((it) => {
      if (it.qty !== 0 ) {
          const path = `Auctions/${auctionName}/provisionalWinner/${it.frequencyBand}_${it.operator}/`;
          update(ref(db, path), {
              airtel: it.qty,
          });
      }
  });

  rjioList.forEach((it) => {
    if (it.qty !== 0 ) {
        const path = `Auctions/${auctionName}/provisionalWinner/${it.frequencyBand}_${it.operator}/`;
        update(ref(db, path), {
            rjio: it.qty,
        });
    }
});

  attList.forEach((it) => {
    if (it.qty !== 0 ) {
        const path = `Auctions/${auctionName}/provisionalWinner/${it.frequencyBand}_${it.operator}/`;
        update(ref(db, path), {
            att: it.qty,
        });
    }
  });

  bsnlList.forEach((it) => {
    if (it.qty !== 0 ) {
        const path = `Auctions/${auctionName}/provisionalWinner/${it.frequencyBand}_${it.operator}/`;
        update(ref(db, path), {
            bsnl: it.qty,
        });
    }
  });

  viList.forEach((it) => {
    if (it.qty !== 0 ) {
        const path = `Auctions/${auctionName}/provisionalWinner/${it.frequencyBand}_${it.operator}/`;
        update(ref(db, path), {
            vi: it.qty,
        });
    }
  });

  // airtelList.forEach((it) => {
  //   if (it.qty !== 0 ) {
  //       const path = `Auctions/${auctionName}/provisionalWinner/${it.frequencyBand}_${it.operator}/`;
  //       set(ref(db, path), {
  //           bsnl: it.qty,
  //       });
  //   }
  // });

  
};



  const handleInit = () => {
    InitCompanyHistory();
  }
  
  const handleDelete = () => {
    const db = getDatabase();
    const refPath = `Auctions/${auctionName}/companyHistory`;
    const companyMapping = {
      'rjio': [],
      'airtel': [],
      'vi': [],
      'att': [],
      'bsnl': []
    };
    set(ref(db, refPath), {
      companyMapping
    });
    console.log("History removed");
  }

  const resetRound = () => {
    const db = getDatabase();
    set(ref(db, `Auctions/${auctionName}/timerData`), {
      start: Date.now(),
      time: 1,
      round: 0
    });
  }

  const InitCompanyHistory = () => {
    const db = getDatabase();
    const startTime = Date.now();
    const companyMapping = {
      'rjio': [{"0" : "INIT"}],
      'airtel': [{"0" : "INIT"}],
      'vi': [{"0" : "INIT"}],
      'att': [{"0" : "INIT"}],
      'bsnl': [{"0" : "INIT"}]
    };
    const refPath = `Auctions/${auctionName}/companyHistory`;
    const itemsRef = ref(db, refPath);
    get((itemsRef)).then((snapshot) => {
      const data = snapshot.val();
      if (!data) {
        console.log("init...done!")
        set(ref(db, refPath), {
          companyMapping
        });
      }
      else {
        console.log("Already set");
      }
    })
  };

  return (
    <div className="admin-dashboard">
      <h2>Auction Instance: {auctionName}</h2>
      <button onClick={deleteAuction} style={{ position: 'fixed', top: '10%', right: '20px', transform: 'translateY(-50%)' }}>Delete Auction</button>
      <button onClick={handleStartTimer} style={{ marginLeft: '50px' }}>Start Timer</button>
      <button onClick={openModal} style={{ marginLeft: '50px' }}>Add Item</button>
      <button onClick={handleInit} style={{marginLeft:'50px'}}>Init Company History</button>
      <button onClick={handleDelete} style={{marginLeft:'50px'}}>Delete Company History</button>
      <button onClick={resetRound} style={{marginLeft:'50px'}}>Round : 0</button>
      <button onClick={publishResult} style={{marginLeft:'50px'}}>UpdateAfterRound</button>
      <button onClick={check} style={{marginLeft:'50px'}}>Provisional Winner</button>

      {isModalOpen && <AddItemModal onAdd={addItem} onCancel={closeModal} auctionName={auctionName}/>}
      
    </div>
  );
}

export default AdminDashboard;
