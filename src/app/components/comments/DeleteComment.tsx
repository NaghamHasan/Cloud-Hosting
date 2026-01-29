"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify';

interface DeleteCommentProps {
    commentId: number
}
const DeleteComment = ({commentId} : DeleteCommentProps) => {

      const router = useRouter();
    
      const handleDelete = () => {
        if(confirm("Are you sure to delete this comment ?"))
        axios.delete(`/api/comments/${commentId}`)
        .then(() => router.refresh())
        .then(() => toast.success("Comment Deleted"))
        .catch(err => toast.error(err.response.data.message));
      }

  return (
    <FaTrash onClick={handleDelete} className="text-red-700 m-auto lg:m-0 cursor-pointer" />
  )
}

export default DeleteComment
