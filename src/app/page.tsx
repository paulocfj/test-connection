'use client'
import React, { useState } from "react";


type ApiResponse = {
  message: string;
}

function Connection() {

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = async () => {  
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/message');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result: ApiResponse = await response.json();
      setData(result);
    } catch (error) {
      if (error instanceof Error) {
          console.log(`[Error] ${error}`);
          setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <div>
            <h2>Data from API:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
        <div className="box-content ">
          <button onClick={fetchData} className="border rounded-md w-20 h-10 border-violet-900 bg-violet-900 hover:bg-violet-600 active:bg-violet-500 focus:outline-none focus:ring focus:ring-violet-900 text-white ">Connect</button>
        </div>
    </React.Fragment>      
  );
}

export default function Home() {  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Wellcome to local connection</h1>
        <p>This site is intended to make a local connection to an application that provides an api call on port 8080.</p>
        <Connection />
      </main>      
    </div>
  );
}
