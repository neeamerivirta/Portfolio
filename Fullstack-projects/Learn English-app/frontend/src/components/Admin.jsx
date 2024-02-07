/**
 * Admin.jsx
 * @date 1/17/2024 - 7:17:04 PM
 *
 **/
import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  // State to store the list of word pairs
  const [wordPairs, setWordPairs] = useState([]);
  // State to track the word pair being edited
  const [editingPair, setEditingPair] = useState(null);
  // State to store the new word pair being added
  const [newPair, setNewPair] = useState({ english: "", finnish: "" });

  // Fetch word pairs from the server when the components mounts
  useEffect(() => {
    console.log("Fetching word pairs...");
    axios
      .get("http://localhost:8080/api/word_pairs")
      .then((response) => {
        setWordPairs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching word pairs:", error);
      });
  }, []);

  // Handle deletion of a word pair
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/word_pairs/${id}`)
      .then(() => {
        setWordPairs((prevWordPairs) =>
          prevWordPairs.filter((pair) => pair.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting word pair:", error);
      });
  };

  // Handle initiating to editing of a word pair
  const handleEdit = (id) => {
    const pairToEdit = wordPairs.find((pair) => pair.id === id);
    setEditingPair(pairToEdit);
  };

  // Handle saving to changes made during editing
  const handleSaveEdit = () => {
    if (!editingPair) {
      return;
    }

    console.log("Saving edited pair:", editingPair);
    axios
      .put(`http://localhost:8080/api/word_pairs/${editingPair.id}`, {
        english: editingPair.english,
        finnish: editingPair.finnish,
      })

      .then((response) => {
        console.log("Save successful:", response.data);
        setWordPairs((prevWordPairs) =>
          prevWordPairs.map((pair) =>
            pair.id === editingPair.id ? { ...pair, ...editingPair } : pair
          )
        );
        setEditingPair(null);
      })
      .catch((error) => {
        console.error("Error updating word pair:", error);
      });
  };

  // Handle canceling the editing process
  const handleCancelEdit = () => {
    setEditingPair(null);
  };

  // Handle adding a new word pair to database
  const handleAddPair = () => {
    axios
      .post("http://localhost:8080/api/word_pairs", newPair)
      .then(() => {
        // Update word list
        axios.get("http://localhost:8080/api/word_pairs").then((response) => {
          setWordPairs(response.data);
        });

        // Empty array
        setNewPair({ id: "", english: "", finnish: "" });
      })
      .catch((error) => {
        console.error("Error adding word pair:", error);
      });
  };

  return (
    <div>
      <h2>Admin page</h2>
      <p>Welcome to the admin page!</p>
      <p>Here you can manage the system.</p>
      <h2>Add new word pair</h2>
      {/* Adding the new ID and words to the list */}
      <div className="admin-page">
        {/* Text box where user can add new word pair and ID*/}
        <label>
          Id:
          <input
            type="text"
            value={newPair.id}
            onChange={(e) => setNewPair({ ...newPair, id: e.target.value })}
          />
        </label>
        <br></br>
        <label>
          English:
          <input
            type="text"
            value={newPair.english}
            onChange={(e) =>
              setNewPair({ ...newPair, english: e.target.value })
            }
          />
        </label>
        <br></br>
        <label>
          Finnish:
          <input
            type="text"
            value={newPair.finnish}
            onChange={(e) =>
              setNewPair({ ...newPair, finnish: e.target.value })
            }
          />
        </label>
        <button onClick={handleAddPair}>Add</button>
      </div>
      <table>
        <thead>
          {/* Array*/}
          <tr>
            <th>Id</th>
            <th>English</th>
            <th>Finnish</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wordPairs.map((pair) => (
            <tr key={pair.id}>
              <td>{pair.id}</td>
              <td>
                {editingPair && editingPair.id === pair.id ? (
                  <input
                    type="text"
                    value={editingPair.english}
                    onChange={(e) =>
                      setEditingPair({
                        ...editingPair,
                        english: e.target.value,
                      })
                    }
                  />
                ) : (
                  pair.english
                )}
              </td>
              <td>
                {editingPair && editingPair.id === pair.id ? (
                  <input
                    type="text"
                    value={editingPair.finnish}
                    onChange={(e) =>
                      setEditingPair({
                        ...editingPair,
                        finnish: e.target.value,
                      })
                    }
                  />
                ) : (
                  pair.finnish
                )}
              </td>
              <td>
                {/* Edit, delete, save and cancel buttons*/}
                <button onClick={() => handleEdit(pair.id)}>Edit</button>
                <button onClick={() => handleDelete(pair.id)}>Delete</button>
                {editingPair && editingPair.id === pair.id && (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
