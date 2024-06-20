﻿using Garnet;
using Xunit;

namespace Netnr.Test
{
    public class TestGarnet
    {
        [Fact]
        public void Start()
        {
            try
            {
                using var server = new GarnetServer([]);
                // Start the server
                server.Start();

                Thread.Sleep(Timeout.Infinite);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unable to initialize server due to exception: {ex.Message}");
            }
        }
    }
}