import React, { useActionState, useEffect } from 'react';
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
import { deleteNoteAction } from '@/app/actions';
import { Loader2, Trash2 } from 'lucide-react';
import { useToast } from './hooks/use-toast';

interface Props {
	id: number;
	title: string;
}

const initialState = {
	message: '',
	code: 200,
};

const NoteItem = ({ id, title }: Props) => {
	const { toast } = useToast();
	const [state, formAction, isPending] = useActionState(deleteNoteAction, initialState);

	useEffect(() => {
		if (!state.message) return;

		toast({
			title: state.message,
			variant: state.code === 200 ? 'success' : 'destructive',
		});
	}, [state, toast]);

	return (
		<div className='flex gap-2 items-center' key={id}>
			<div className='border border-gray-300 rounded-md px-3 py-2 bg-gray-100 flex-grow w-[400px] text-ellipsis text-nowrap overflow-hidden'>
				{title}
			</div>

			<AlertDialog>
				<AlertDialogTrigger>
					{isPending ? (
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
							This action cannot be undone. This will permanently delete your
							note and remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<form action={formAction}>
							<input type='hidden' name='note_id' value={id} />
							<AlertDialogAction type='submit'>Delete</AlertDialogAction>
						</form>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default NoteItem;
