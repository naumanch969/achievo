"use client"

import React, { useState } from 'react'
import { Note } from '@prisma/client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { useNoteModal } from '@/hooks/use-note';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import AlertModal from '@/components/modals/alert-modal';
import { MountedContainer } from '@/components/ui/mounted-container';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NoteCard = ({ note }: { note: Note }) => {

  const noteModal = useNoteModal()
  const router= useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/note/${note.id}`)
      setOpen(false)
      router.refresh()
      toast.success('Success!')
    } catch (error: any) {
      toast.error(error?.response?.data || "Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  const onUpdateClick = () => {
    noteModal.onFormOpen()
    noteModal.setNote(note)
  }


  return (
    <MountedContainer>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Card className="bg-primary/10 rounded-xl border-0 transition flex flex-col justify-between "            >

        <div className="flex flex-col">
          <CardHeader className="flex flex-col gap-4 justify-start items-center text-muted-foreground  ">
            <CardTitle className="text-white w-full text-start capitalize hover:opacity-80 " >
              <Link href={`/note/view/${note.id}`} className='flex items-center gap-x-2' >{note.title}</Link>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="text-xs text-start">
              {note.description.length > 450
                ? `${note.description.substring(0, 450)}...`
                : note.description
              }
            </CardDescription>
          </CardContent>

          <CardFooter className='flex justify-end items-center gap-x-2 ' >
            <Button onClick={onUpdateClick} size='icon' variant='secondary' ><Edit /></Button>
            <Button onClick={() => setOpen(true)} size='icon' variant='destructive' ><Trash /></Button>
          </CardFooter>
        </div>
      </Card>
    </MountedContainer>
  )
}

export default NoteCard