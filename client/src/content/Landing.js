import * as React from 'react';

function Landing() {
  return (
    <div className="Landing">
      <header className="Landing-header">
      <h1 class="font-semibold text-8xl">
        Chattastic
      </h1>
        <p class="m-5 font-extralight">
          Pick a subject. Start chatting.
        </p>
         <input class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-2/4 text-3xl leading-6 m-5 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm opacity-25" type="text" aria-label="Filter projects" placeholder="press enter to go"/>
      </header>
    </div>
  );
}

export default Landing;
