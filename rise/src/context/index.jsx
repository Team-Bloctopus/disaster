import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite,useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
//import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract("0xaB019AB4173a2DeEE14e74ff3539Ed55c08C03Da");
  const { mutateAsync: createPost } = useContractWrite(contract, 'createPost');
  const { mutateAsync: upvotePost, isLoading } = useContractWrite(contract, "upvotePost");
  const { mutateAsync: updatePublicView, } = useContractWrite(contract, "updatePublicView");
  const { mutateAsync: createDisaster   } = useContractWrite(contract, "createDisaster")
  const upVote = async (id) => {
    //debugger
    try {
      const data = await upvotePost([id]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
  const address = useAddress();
  const connect = useMetamask();



  //const { mutateAsync: upvotePost, isLoading } = useContractWrite(contract, "upvotePost");

  // const upVoteCall = async (_id) => {

  //   try {
  //     const data = await upvotePost();
  //     console.info("contract call successs", data);
  //   } catch (err) {
  //     console.error("contract call failure", err);
  //   }
  // };


  const publishDisaster = async (form) => {
    try {
        const data = await createDisaster({ args: [
            address, form.name, form.description, form.location, form.image, form.startDate, form.endDate, form.scale] });
        console.info("contract call successs", data);
      } catch (err) {
        console.error("contract call failure", err);
      }
    }

const updatePublic= async (_id) => {
  const data = await contract.call("updatePublicView", [_id])
}

//   const publishPost = async (form) => {
//     console.log(form);

//     try {

//       const data = await createPost([
//         address, // owner
//         form.title, // title
//         form.description, // description
//         form.location,
//         form.image,
//         new Date(form.time).getTime(), // time(event time),

//       ]);
//       console.log('contract call success', data);
//     } catch (err) {
//       console.log('contract call error', err);
//     }



//   };

  const publishPost = async (form) => {
    try {
      const data = await createPost({args:[
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image
      ]} );

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };



  const getDisasters = async () => {
    const disasters = await contract.call('getDisasters');
  //  const { data, isLoading } = useContractRead(contract, "getDisasters", [{{args}}])

    const parsedDisasters = disasters.map((campaign, i) => ({
      owner: campaign.owner,
      name: campaign.name,
      description: campaign.description,
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      location: campaign.location,
        startDate: campaign.startDate.toNumber(),
        endDate: campaign.endDate.toNumber(),
        scale: campaign.scale,
        volunteers: campaign.volunteerCount.toNumber(),
      pId: i
    }));

    return parsedDisasters;
  };

  const getPosts = async () => {
    const disasters = await contract.call('getPosts');

    const parsedCampaings = disasters.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      disasterName: campaign.disasterName,
      description: campaign.description,
      location:campaign.location,
      upvotes: campaign.upvotes,
      eventTime: campaign.eventTime.toNumber(),
      image: campaign.image,
      showPublic: campaign.showPublic,
      showAdmin: campaign.showAdmin,
      pId: i
    }));

    return parsedCampaings;
  };





//   const getAdminPost = async () => {
//     const adminPost = await contract.call('getPosts');

//     const parsedAdminPosts = adminPost.map((item, i) => ({
//       owner: item.owner,
//       description: item.description,
//       title: item.title,
//       upvotes: item.upvotes,
//       location: item.location,
//       image: item.image,
//       eventTime: item.eventTime,
//       postTime: item.postTime,
//       showPolice: item.showPolice,
//       showPublic: item.showPublic,
//       pId: i
//     }));
//     console.log(parsedAdminPosts);

//     return parsedAdminPosts;
//   };

// //   const getDisasters = async () => {
// //     const alldisasters = await getDisasters();

// //     const filtereddisasters = alldisasters.filter((campaign) => campaign.owner === address);

// //     return filtereddisasters;
// //   };

  const donate = async (address, amount) => {
   // debugger;
    const data = await contract.call('transfer', address,  ethers.utils.parseEther(amount).toString() );
   // const data = await contract.call("transfer", [address, amount])
    return data;
  };
const donateDisaster = async (  id, amount) => {
  try {
    //const data = await donateToDisaster({ args: [_id, amount] });
    const data = contract.call('donateToDisaster', [id, amount]);
    console.info("contract call successs", data);
  } catch (err) {
    console.error("contract call failure", err);
  }
}
  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0;i < numberOfDonations;i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      });
    }

    return parsedDonations;
  };

const verifyVolunteer = async(_id,_name) => {
    const data = await contract.call('verifyVolunteer', [_id,_name]);
    return data;
}
  return (
    <StateContext.Provider
      value={{
        publishDisaster,
        address,
        contract,
        connect,
        donateDisaster,
       // createCampaign: publishCampaign,
        getDisasters,
        publishPost,
        upVote,
        verifyVolunteer,
        getPosts,
        donate,
        getDonations,
        updatePublic
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);