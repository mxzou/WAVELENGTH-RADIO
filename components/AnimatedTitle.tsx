'use client'

import { useEffect } from 'react';

export default function AnimatedTitle() {
  useEffect(() => {
    let msg = "WAVELENGTH RADIO ©2024";
    msg = " Do not be afraid of competition.\n" +
"An exciting opportunity lies ahead of you.\n" +
"You love peace.\n" +
"Get your mind set...confidence will lead you on.\n" +
"You will always be surrounded by true friends.\n" +
"Sell your ideas-they have exceptional merit.\n" +
"You should be able to undertake and complete anything.\n" +
"You are kind and friendly.\n" +
"You are wise beyond your years.\n" +
"Your ability to juggle many tasks will take you far.\n" +
"A routine task will turn into an enchanting adventure.\n" +
"Beware of all enterprises that require new clothes.\n" +
"Be true to your work, your word, and your friend.\n" +
"Goodness is the only investment that never fails.\n" +
"A journey of a thousand miles begins with a single step.\n" +
"Forget injuries; never forget kindnesses.\n" +
"Respect yourself and others will respect you.\n" +
"A man cannot be comfortable without his own approval.\n" +
"Always do right. This will gratify some people and astonish the rest.\n" +
"It is easier to stay out than to get out.\n" +
"Sing everyday and chase the mean blues away.\n" +
"You will receive money from an unexpected source.\n" +
"Attitude is a little thing that makes a big difference.\n" +
"Plan for many pleasures ahead.\n" +
"Experience is the best teacher.\n" +
"You will be happy with your spouse.\n" +
"Expect the unexpected.\n" +
"Stay healthy. Walk a mile.\n" +
"The family that plays together stays together.\n" +
"Eat chocolate to have a sweeter life.\n" +
"Once you make a decision the universe conspires to make it happen.\n" +
"Make yourself necessary to someone.\n" +
"The only way to have a friend is to be one.\n" +
"Nothing great was ever achieved without enthusiasm.\n" +
"Dance as if no one is watching.\n" +
"Live this day as if it were your last.\n" +
"Your life will be happy and peaceful.\n" +
"Reach for joy and all else will follow.\n" +
"Move in the direction of your dreams.\n" +
"Bloom where you are planted.\n" +
"Appreciate. Appreciate. Appreciate.\n" +
"Happy News is on its way. " + msg;
    let position = 0;

    function scrolltitle() {
      document.title = msg.substring(position, msg.length) + msg.substring(0, position);
      position++;
      if (position > msg.length) position = 0;
      window.setTimeout(scrolltitle, 170);
    }

    scrolltitle();
  }, []);

  return null;
}
