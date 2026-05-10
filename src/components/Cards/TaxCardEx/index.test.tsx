import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaxCard from './index';

// Mock amCharts 5 to avoid JSDOM compatibility issues
jest.mock('@amcharts/amcharts5', () => ({
  Root: {
    new: jest.fn(() => ({
      setThemes: jest.fn(),
      container: {
        children: {
          push: jest.fn(() => ({
            series: {
              push: jest.fn(() => ({
                data: { setAll: jest.fn() },
                labels: { template: { setAll: jest.fn() } },
                slices: { template: { setAll: jest.fn() } },
                appear: jest.fn(),
              })),
            },
            appear: jest.fn(),
          })),
        },
      },
      dispose: jest.fn(),
    })),
  },
  color: jest.fn(),
  Container: {
    new: jest.fn(() => ({
      children: { push: jest.fn() }
    }))
  }
}));

jest.mock('@amcharts/amcharts5/percent', () => ({
  SlicedChart: { new: jest.fn() },
  PyramidSeries: { new: jest.fn() },
}));

jest.mock('@amcharts/amcharts5/themes/Animated', () => ({
  new: jest.fn(),
}));

// Mock Framer Motion to simplify animations in tests
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('TaxCard Component', () => {
  it('renders correctly with default salary and personal deduction', () => {
    render(<TaxCard />);
    
    // Check for "เงินเดือน" which is core income
    expect(screen.getByText('เงินเดือน')).toBeInTheDocument();
    
    // Check for default deductions
    expect(screen.getByText('ลดหย่อนส่วนตัว')).toBeInTheDocument();
    expect(screen.getByText('ประกันสังคม')).toBeInTheDocument();
  });

  it('updates total income when salary amount is changed', () => {
    render(<TaxCard />);
    
    const salaryInput = screen.getByPlaceholderText('0');
    fireEvent.change(salaryInput, { target: { value: '1,000,000' } });
    
    // Check "รายได้รวมทั้งปี" summary card
    // Use regex to match parts of the text since it might be in multiple text nodes
    expect(screen.getByText(/1,000,000/)).toBeInTheDocument();
  });

  it('calculates net income and tax payable correctly after salary input', async () => {
    render(<TaxCard />);
    
    const salaryInput = screen.getByPlaceholderText('0');
    fireEvent.change(salaryInput, { target: { value: '1,000,000' } });
    
    // Calculations verified in previous step
    expect(screen.getByText(/831,000/)).toBeInTheDocument(); // Net Income
    expect(screen.getByText(/81,200/)).toBeInTheDocument(); // Tax Payable
  });

  it('opens and closes the Income Selector Modal', async () => {
    render(<TaxCard />);
    
    const addButton = screen.getByRole('button', { name: /เพิ่มรายได้ประเภทอื่น/i });
    fireEvent.click(addButton);
    
    // Modal title
    expect(screen.getByText('เพิ่มรายได้ประเภทอื่น', { selector: 'span' })).toBeInTheDocument();
    
    const cancelButton = screen.getByRole('button', { name: /ยกเลิก/i });
    fireEvent.click(cancelButton);
    
    await waitFor(() => {
      expect(screen.queryByText('เพิ่มรายได้ประเภทอื่น', { selector: 'span' })).not.toBeInTheDocument();
    });
  });

  it('allows adding a new income type from the modal', () => {
    render(<TaxCard />);
    
    fireEvent.click(screen.getByRole('button', { name: /เพิ่มรายได้ประเภทอื่น/i }));
    
    // Find and add "ค่าเช่า" button inside modal (accessible name includes desc/tag)
    const rentalButton = screen.getByRole('button', { name: /ค่าเช่า/i });
    fireEvent.click(rentalButton);
    
    // Modal should close and "ค่าเช่า" should appear in main list
    expect(screen.queryByText('เพิ่มรายได้ประเภทอื่น', { selector: 'span' })).not.toBeInTheDocument();
    expect(screen.getAllByText('ค่าเช่า').length).toBeGreaterThan(0);
  });

  it('allows adding a new deduction type from the modal', () => {
    render(<TaxCard />);
    
    fireEvent.click(screen.getByRole('button', { name: /เพิ่มค่าลดหย่อน/i }));
    
    // Find and add "กองทุน SSF" button inside modal
    const ssfButton = screen.getByRole('button', { name: /กองทุน SSF/i });
    fireEvent.click(ssfButton);
    
    expect(screen.getByText('กองทุน SSF')).toBeInTheDocument();
  });

  it('can remove a removable deduction', async () => {
    render(<TaxCard />);
    
    // Add insurance first
    fireEvent.click(screen.getByRole('button', { name: /เพิ่มค่าลดหย่อน/i }));
    fireEvent.click(screen.getByRole('button', { name: /เบี้ยประกันชีวิต/i }));
    
    const insuranceText = screen.getByText('เบี้ยประกันชีวิต');
    expect(insuranceText).toBeInTheDocument();
    
    // Find the insurance row and click its remove button (the one with the X icon)
    // In our implementation, removable items have a button with TbX at the end of the row
    const insuranceRow = insuranceText.closest('.flex.flex-col.py-2');
    const buttons = insuranceRow?.querySelectorAll('button');
    const removeBtn = buttons ? buttons[buttons.length - 1] : null;
    
    if (removeBtn) {
      fireEvent.click(removeBtn);
    }
    
    await waitFor(() => {
      expect(screen.queryByText('เบี้ยประกันชีวิต')).not.toBeInTheDocument();
    });
  });
});
