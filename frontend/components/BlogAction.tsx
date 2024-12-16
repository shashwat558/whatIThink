'use client';

import React from 'react';
import { FiEdit } from 'react-icons/fi';
import Link from 'next/link';
import { isAdmin } from '@/lib/utils';



const BlogActions = ({ id }: { id: number }) => {
  const admin = isAdmin();

  if (!admin) return null;

  return (
    <Link href={`/blog/edit/${id}`}>
      <FiEdit className="cursor-pointer hover:opacity-[0.5]" />
    </Link>
  );
};

export default BlogActions;
