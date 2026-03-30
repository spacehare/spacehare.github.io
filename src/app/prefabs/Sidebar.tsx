'use client'

import Wad from '@/app/assets/prefabs/wad.json'
import { useContext } from 'react'
import DropDown from '../components/DropDown'
import { FamiliesPanel } from './FamiliesPanel'
import HowToUseMdx from './HowToUse.mdx'
import { PrefabContext } from './prefabContext'
import SidebarMdx from './sidebar.mdx'

export default function Sidebar() {
    const ctx = useContext(PrefabContext)
    if (!ctx) {
        return
    }

    const [search, setSearch] = ctx.search
    const [searchRegex, setSearchRegex] = ctx.searchRegex
    const [viewMode, setViewMode] = ctx.viewMode
    const [prototypeColor, setPrototypeColor] = ctx.prototypeColor
    const [trimColor, setTrimColor] = ctx.trimColor
    const [trimStyle, setTrimStyle] = ctx.trimStyle
    const [viewSidebar, setViewSidebar] = ctx.viewSidebar
    const [families, setFamilies] = ctx.families

    return (
        <div className='flex flex-col gap-3 sticky top-2'>
            {/* SIDEBAR TOGGLE BUTTON*/}
            <button
                className='bg-green-800 p-1 w-full text-center px-3 rounded-md active:brightness-125 hover:brightness-110 uppercase'
                onClick={() => {
                    setViewSidebar(!viewSidebar)
                }}
            >
                {viewSidebar ? 'toggle sidebar' : '+'}
            </button>

            {/* SIDEBAR CONTENTS */}
            <div
                className={`w-72 bg-solid-light h-fit p-3 flex flex-col gap-2.5 rounded-md rounded-bl-3xl text-lime-100 ${
                    !viewSidebar && 'hidden'
                }`}
            >
                {/* SEARCH */}
                <div className='flex gap-2'>
                    <input
                        type='text'
                        placeholder='Search'
                        onKeyUp={(e) => setSearch(e.currentTarget.value)}
                        autoFocus
                        className='bg-solid-dark text-lime-200 outline-none px-2 py-1 rounded-md placeholder:text-lime-200/50 w-full'
                    />
                    <button
                        className={`${
                            searchRegex ? 'bg-green-600' : 'bg-green-800'
                        } p-1 w-min text-center px-3 rounded-md hover:brightness-110 uppercase`}
                        onClick={() => {
                            setSearchRegex(!searchRegex)
                        }}
                        title='Regular Expression match'
                    >
                        .*
                    </button>
                </div>

                <HowToUseMdx />

                {/* VIEW MODE */}
                <button
                    className='bg-green-800 p-1 w-full text-left px-3 rounded-md active:brightness-125 hover:brightness-110 capitalize'
                    onClick={() => {
                        setViewMode(!viewMode)
                    }}
                >
                    {'current view mode: ' + (viewMode ? 'group' : 'individual')}
                </button>
                {/* SORT MODE */}
                {/* TODO LOL */}

                {/* DROPDOWNS */}
                <h1 className='text-center text-xl font-thin capitalize mt-12'>clipboard export options</h1>
                <div className='gap-2 flex flex-col'>
                    <DropDown
                        getter={trimColor}
                        setter={setTrimColor}
                        label='Trim Color'
                        items={Wad.trim.color}
                        storageKey='trim_color'
                        className='flex gap-2'
                    />
                    <DropDown
                        getter={trimStyle}
                        setter={setTrimStyle}
                        label='Trim Style'
                        items={Wad.trim.style}
                        storageKey='trim_style'
                        className='flex gap-2'
                    />
                    <DropDown
                        getter={prototypeColor}
                        setter={setPrototypeColor}
                        label='Prototype Color'
                        items={Wad.prototype.color}
                        storageKey='prototype_color'
                        className='flex gap-2'
                    />
                </div>

                {/* FAMILIES */}
                <FamiliesPanel families={families} />

                {/* FINAL MDX */}
                <div className='font-atkinson flex flex-col gap-3 mt-12'>
                    <SidebarMdx />
                </div>
            </div>
        </div>
    )
}
