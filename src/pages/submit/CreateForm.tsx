"use client";

import React, { ChangeEvent } from 'react'
import styles from './SubmitPage.module.css'
import { useState } from 'react'
import Button from '../../components/Button'
import { api } from "src/utils/api";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const CreateForm = () => {

    type DropdownIndexMap = {
        [String: string]: number;
      };

    const categoryIndexMap: DropdownIndexMap = {
        "musikkleker": 1,
        "sports- og aktivitetsleker": 2,
        "drikkeleker": 3,
        "mimeleker": 4,
        "quiz": 5,
        "tegneleker": 6,
        "2 personer": 7
    };

    const difficultyIndexMap: DropdownIndexMap = {
        "lett": 1,
        "middels": 2,
        "vanskelig": 3
    }

    const [form, setForm] = useState({
        title: '',
        description: '',
        duration: 0,
        difficulty: "",
        userID: Cookies.get("username") || "Default",
        category: "musikkleker",
    })

    const postMessage = api.icebreakers.postMessage.useMutation();
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let newValue: string | number = value;

        if (name === 'duration') {
            // Parse the value to float only if it's not an empty string
            newValue = value === '' ? '' : parseFloat(value);
        }

        setForm(prevForm => ({
            ...prevForm,
            [name]: newValue
        }));
    };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        postMessage.mutate({
            ...form,
            difficulty: difficultyIndexMap[form.difficulty] || 1,
            category: categoryIndexMap[form.category] || 1
        },
        
        {
            onSuccess: () => {
                router.push('/');
            }    
        });

        //Reset form
        setForm({
            title: '',
            description: '',
            duration: 0,
            difficulty: "lett",
            userID: Cookies.get("username") || "Default",
            category: "musikkleker"
        });
    };

    return (
        <div className="mx-auto w-5/6 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 p-10" >
            <form onSubmit={handleSubmit}>
                <div className={styles.inputDivs}>
                    <label htmlFor='title' className={styles.labels}> Navn på icebreaker: </label>
                    <input
                        type="text"
                        required
                        id='title'
                        name='title'
                        className={styles.inputs}
                        onChange={handleChange}
                        value={form.title}
                    />
                </div>
                <div className={styles.inputDivs}>
                    <label htmlFor='category' className={styles.labels}> Kategori: </label>
                    <select
                        id="category"
                        className={styles.inputs}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        value={form.category}>

                        <option value="musikkleker">Musikkleker</option>
                        <option value="sports- og aktivitetsleker">Sports- og aktivitetsleker</option>
                        <option value="drikkeleker">Drikkeleker</option>
                        <option value="mimeleker">Mimeleker</option>
                        <option value="quiz">Quiz</option>
                        <option value="tegneleker">Tegneleker</option>
                        <option value="2 personer">2 personer</option>
                        <option value="annet">Annet</option>
                    </select>

                </div>
                <div className={styles.inputDivs}>
                    <label htmlFor="description" className={styles.labels}> Beskrivelse: </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        className={styles.inputs}
                        rows={7}
                        onChange={handleChange}
                        value={form.description}
                    ></textarea>
                </div>
                <div className={styles.inputDivs} >
                    <label htmlFor="duration" className={styles.labels} > Tidsestimat i minutter (1-60): </label>
                    <input
                        className={styles.inputs}
                        type="number"
                        id='duration'
                        name="duration"
                        required
                        step={1}
                        min={1}
                        max={60}
                        onChange={handleChange}
                        value={form.duration} />

                </div>
                <div className={styles.inputDivs}>
                    <label htmlFor='difficulty' className={styles.labels}> Vanskelighetsgrad:</label>
                    <select
                        id="difficulty"
                        className={styles.inputs}
                        onChange={handleChange}
                        value={form.difficulty}>

                        <option value="lett">Lett</option>
                        <option value="middels">Middels</option>
                        <option value="vanskelig">Vanskelig</option>
                    </select>

                </div>
                <div className=' flex justify-center align-middle pt-6'>
                    <Button text="Opprett Icebreaker" />
                </div>

            </form>
        </div>
    )
}

export default CreateForm;
