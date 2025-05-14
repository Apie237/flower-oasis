import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-6 text-center">
      <p className="text-gray-500 text-lg sm:text-xl">
        {text1}{' '}
        <span className="text-gray-700 font-semibold">{text2}</span>
      </p>
      <hr className="mt-2 w-20 mx-auto border-t-2 border-gray-700" />
    </div>
  );
};

export default Title;
