const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			getContacts: async () => {
				try {
					const resp = await fetch("https://playground.4geeks.com/contact/agendas/axelluribe/contacts");
					if (!resp.ok) throw new Error("Error fetching contacts");
					const data = await resp.json();
					setStore({ contacts: data.contacts || [] });
				} catch (err) {
					console.error(err);
				}
			},
			addContact: async contact => {
				try {
					await fetch("https://playground.4geeks.com/contact/agendas/axelluribe/contacts", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(contact)
					});
					getActions().getContacts();
				} catch (err) {
					console.error(err);
				}
			},
			updateContact: async (id, contact) => {
				try {
					await fetch(`https://playground.4geeks.com/contact/agendas/axelluribe/contacts/${id}`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(contact)
					});
					getActions().getContacts();
				} catch (err) {
					console.error(err);
				}
			},
			deleteContact: async id => {
				try {
					await fetch(`https://playground.4geeks.com/contact/agendas/axelluribe/contacts/${id}`, {
						method: "DELETE"
					});
					getActions().getContacts();
				} catch (err) {
					console.error(err);
				}
			}
		}
	};
};

export default getState;
