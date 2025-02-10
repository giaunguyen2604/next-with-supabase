'use client';

import React, { use, useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { createNoteAction } from '@/app/actions';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from './hooks/use-toast';

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type='submit' disabled={pending} className='mt-3'>
            {pending && <Loader2 className='animate-spin' />}
            Submit
        </Button>
    );
}

const initialState = {
	message: '',
	code: 200
  }

const AddNoteForm = () => {
	const [state, formAction] = useActionState(createNoteAction, initialState)
	const { toast } = useToast();
	
	useEffect(() => {
		if (!state.message) return;

		toast({
			title: state.message,
			variant: state.code === 200 ? "success" : "destructive"
		})
	}, [state]);

	return (
		<form className='flex flex-col' action={formAction}>
			<input
				name='note'
				type='text'
				placeholder='Enter a note'
				className='border border-gray-300 rounded-md px-3 py-2'
				required
			/>
			<SubmitButton />
		</form>
	);
};

export default AddNoteForm;
