import React from "react";
import Booking from "./Booking";
import Pets from "./Pets";
import Profile from "./Profile";
import Events from "./Events";
import { useState } from "react";

const UserPortal = (props) => {
  const [choice, setchoice] = useState("profile");

  const setProfile = () => {
    setchoice("profile");
  };
  const setBooking = () => {
    setchoice("booking");
  };
  const setEventPage = () => {
    setchoice("event");
  };
  const setPetPage = () => {
    setchoice("pet");
  };
  return (
    <>
      <div class="flex flex-row p-5 bg-[#FFF7DC]">
        <button
          class="inline-flex items-center justify-center rounded-full w-[120px] h-10 bg-secondary  text-[15px] text-white pb-[5px] font-bold"
          onClick={setProfile}
        > 
          my profile
        </button>

        <button
          class="inline-flex items-center justify-center ml-3 rounded-full w-[120px] px-4 py-2 bg-secondary text-[15px] hover:bg-gray-400 text-white pb-[10px]  font-bold"
          onClick={setBooking}
        >
          my booking
        </button>

        <button
          class="inline-flex items-center justify-center ml-3 rounded-full w-[120px] px-4 py-2 bg-secondary  text-[15px] hover:bg-gray-400 text-white pb-[10px] font-bold"
          onClick={setEventPage}
        >
          my event
        </button>

        <button
          class="inline-flex items-center justify-center ml-3 rounded-full w-[120px] px-4 py-2 bg-secondary  text-[15px] hover:bg-gray-400 text-white pb-[10px] font-bold"
          onClick={setPetPage}
        >
          my pets
        </button>
      </div>
      {choice === "profile" ? (
        <Profile />
      ) : choice === "booking" ? (
        <Booking />
      ) : choice === "pet" ? (
        <Pets />
      ) : (
        <Events />
      )}
    </>
  );
};

export default UserPortal;
