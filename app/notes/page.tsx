import AddNoteForm from '@/components/add-note-form';
import NoteList from '@/components/note-list';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect('/sign-in');
	}

	const { data: notes } = await supabase.from('notes').select();

	return (
		<div className='w-[400px]'>
			<AddNoteForm />
			<NoteList notes={notes as { id: number; title: string }[]} />
		</div>
	);
}
