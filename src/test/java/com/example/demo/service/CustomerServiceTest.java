package com.example.demo.service;

import com.example.demo.entity.Customer;
import com.example.demo.repository.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import java.time.LocalDate;

public class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private CustomerService customerService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveCustomer_Success() {
        Customer customer = new Customer(1L, "Mohit", "Raheja", LocalDate.of(2002,1,2));
        when(customerRepository.save(customer)).thenReturn(customer);
        Customer result = customerService.saveCustomer(customer);
        assertEquals(customer, result);
        verify(customerRepository, times(1)).save(customer);
    }

    @Test
    public void testGetAllCustomers_Success() {
        Customer customer1 = new Customer(1L, "Mohit", "Raheja", LocalDate.of(2002,1,2));
        Customer customer2 = new Customer(2L, "Ansh", "Raheja", LocalDate.of(2003,8,5));
        List<Customer> customers = Arrays.asList(customer1, customer2);
        when(customerRepository.findAll()).thenReturn(customers);
        List<Customer> result = customerService.getAllCustomers();
        assertEquals(customers.size(), result.size());
        assertEquals(customers, result);
        verify(customerRepository, times(1)).findAll();
    }

    @Test
    public void testSaveCustomer_Exception() {
        Customer customer = new Customer(1L, "Mohit", "Raheja", LocalDate.of(2002,1,2));
        when(customerRepository.save(customer)).thenThrow(new RuntimeException("Database error"));
        try {
            customerService.saveCustomer(customer);
        } catch (Exception e) {
            assertEquals("Database error", e.getMessage());
        }
        verify(customerRepository, times(1)).save(customer);
    }

    @Test
    public void testGetAllCustomers_Empty() {
        when(customerRepository.findAll()).thenReturn(Arrays.asList());
        List<Customer> result = customerService.getAllCustomers();
        assertEquals(0, result.size());
        verify(customerRepository, times(1)).findAll();
    }
}
