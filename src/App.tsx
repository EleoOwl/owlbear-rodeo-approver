import { useState, useEffect } from 'react'
import './App.css'

import { setupApprover } from './approver'

function App() {

    useEffect(() => {
        const approve = document.getElementById('approve-button')

        const disapprove = document.getElementById('disapprove-button')

        if (approve) {
            setupApprover(approve)
        }
        if (disapprove) {
            setupApprover(disapprove)
        }
    })

        return (
            <>

                <div className="card">
                    <button id="approve-button">
                        Approve
                    </button >
                    <button id="disapprove-button">
                        Disapprove
                    </button>

                </div>

            </>
        )
    }

export default App
