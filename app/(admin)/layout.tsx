'use client';
import React, { PropsWithChildren, useState } from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import Navbar from '@/components/layouts/Navbar';
const Layout = (props: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // @ts-ignore
  return (
    <div className='grid min-h-screen grid-rows-header bg-zinc-100'>
      <div>
        <Navbar />
      </div>

      <div className='grid md:grid-cols-sidebar'>
        <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />

        {props.children}
      </div>
    </div>
  );
};

export default Layout;
