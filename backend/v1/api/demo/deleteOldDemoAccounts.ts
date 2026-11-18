import { supabaseAdmin } from '../../../supabaseclient';

// deletes demo accounts (and their quotes) that are older than maxAgeHours
// never throws, so a cleanup problem can't break the demo
export async function deleteOldDemoAccounts(maxAgeHours: number = 24): Promise<void> {
    try {
        const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });

        if (error) {
            console.error('Error listing users for demo cleanup:', error);
            return;
        }

        const cutoff = Date.now() - maxAgeHours * 60 * 60 * 1000;
        const oldDemoUsers = data.users.filter(user => user.is_anonymous && new Date(user.created_at).getTime() < cutoff);

        for (const user of oldDemoUsers) {
            const { error: quotesError } = await supabaseAdmin
                .from('saved_quotes')
                .delete()
                .eq('user_id', user.id);

            if (quotesError) {
                console.error(`Error deleting quotes for demo user ${user.id}:`, quotesError);
                continue;
            }

            const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

            if (deleteError) {
                console.error(`Error deleting demo user ${user.id}:`, deleteError);
            }
        }
    } catch(error) {
        console.error('Error in deleteOldDemoAccounts:', error);
    }
}
