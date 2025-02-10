'use client';

import { deleteNoteAction } from '@/app/actions';
import { Loader2, Trash2 } from 'lucide-react';
import React, { useActionState, useEffect, useState } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from './hooks/use-toast';

interface Props {
	notes: { id: number; title: string }[];
}

const initialState = {
	message: '',
	code: 200,
    id: -1,
};

const NoteList = ({ notes }: Props) => {
	const { toast } = useToast();
	const [state, formAction, isPending] = useActionState(deleteNoteAction, initialState);
    const [deletingId, setDeletingId] = useState(-1);

	useEffect(() => {
		if (!state.message) return;

		toast({
			title: state.message,
			variant: state.code === 200 ? 'success' : 'destructive',
		});
	}, [state]);

	return (
		<div className='mt-3'>
			<h1 className='font-bold'>Notes:</h1>
			<div className='flex flex-col gap-3 mt-2'>
				{notes?.map(note => (
					<div className='flex gap-2 items-center' key={note.id}>
						<div className='border border-gray-300 rounded-md px-3 py-2 bg-gray-100 flex-grow w-[400px] text-ellipsis text-nowrap overflow-hidden'>
							{note.title}
						</div>

						<AlertDialog>
							<AlertDialogTrigger>
								{isPending && deletingId === note.id ? (
									<Loader2 className='animate-spin' />
								) : (
									<Trash2
										className='cursor-pointer hover:text-red-500 transition-colors duration-300'
										aria-disabled={isPending}
									/>
								)}
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Are you want to delete this note?
									</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										your note and remove your data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<form action={formAction}>
										<input type='hidden' name='note_id' value={note.id} />
										<AlertDialogAction type='submit' onClick={() => setDeletingId(note.id)}>Delete</AlertDialogAction>
									</form>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				))}
			</div>
		</div>
	);
};

export default NoteList;
