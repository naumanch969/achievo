"use client"

import { PopulatedDiary } from '@/interfaces'
import React from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'
import { MountedContainer } from '@/components/ui/mounted-container'

const Graphs = ({ diary }: { diary: PopulatedDiary }) => {

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];


  return (
    <MountedContainer>
      <div className="w-full overflow-x-auto space-x-2 p-1 aspect-[3.5/1] overflow-hidden ">
        <div className="w-full h-full grid grid-cols-7 gap-x-4 ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                // activeIndex={this.state.activeIndex}
                // activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              // onMouseEnter={this.onPieEnter}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </MountedContainer>
  )
}

export default Graphs